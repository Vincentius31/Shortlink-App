package repository

import (
	"context"
	"fmt"
	"shortlink-app/internal/model"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserRepository struct {
	db *pgxpool.Pool
}

func NewUserRepository(db *pgxpool.Pool) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	query := `SELECT id, email, password_hash, full_name, bio, profile_picture, created_at 
              FROM users WHERE email = $1`

	rows, err := r.db.Query(ctx, query, email)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.User])
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) GetByID(ctx context.Context, id int) (*model.User, error) {
	query := `SELECT id, email, password_hash, full_name, bio, profile_picture, created_at 
              FROM users WHERE id = $1`
	rows, err := r.db.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.User])
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Create(ctx context.Context, user model.User) error {
	query := `INSERT INTO users (email, password_hash) VALUES ($1, $2)`
	_, err := r.db.Exec(ctx, query, user.Email, user.PasswordHash)
	return err
}

// GetProfileInfo mengambil detail user + jumlah link aktif
func (r *UserRepository) GetProfileInfo(ctx context.Context, userID int) (*model.UserProfileResponse, error) {
	query := `
		SELECT u.email, COALESCE(u.full_name, ''), COALESCE(u.bio, ''), 
		       COALESCE(u.profile_picture, ''), u.created_at, COUNT(l.id)
		FROM users u
		LEFT JOIN links l ON l.user_id = u.id AND l.deleted_at IS NULL
		WHERE u.id = $1
		GROUP BY u.email, u.full_name, u.bio, u.profile_picture, u.created_at`

	var p model.UserProfileResponse
	var createdAt time.Time

	err := r.db.QueryRow(ctx, query, userID).Scan(
		&p.Email, &p.FullName, &p.Bio, &p.ProfilePicture, &createdAt, &p.LinkCount,
	)
	if err != nil {
		return nil, err
	}

	p.CreatedAt = createdAt.Format("January 2, 2006")
	return &p, nil
}

// UpdateProfileWithTx melakukan pembaruan data user dan mencatat log dalam satu transaksi
func (r *UserRepository) UpdateProfileWithTx(ctx context.Context, userID int, fullName, bio, avatarPath string) error {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	query := `UPDATE users SET full_name = $1, bio = $2, profile_picture = $3 WHERE id = $4`
	result, err := tx.Exec(ctx, query, fullName, bio, avatarPath, userID)
	if err != nil {
		return fmt.Errorf("error update users: %v", err)
	}

	if result.RowsAffected() == 0 {
		return fmt.Errorf("no user found with id %d", userID)
	}

	logQuery := `INSERT INTO user_logs (user_id, action) VALUES ($1, $2)`
	_, err = tx.Exec(ctx, logQuery, userID, "Updated Profile info")
	if err != nil {
		return fmt.Errorf("error insert logs: %v", err)
	}

	return tx.Commit(ctx)
}
