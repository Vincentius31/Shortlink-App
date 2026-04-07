package repository

import (
	"context"
	"shortlink-app/internal/model"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type LinkRepository struct{
	db *pgxpool.Pool
}

func NewLinkRepository(db *pgxpool.Pool) *LinkRepository {
	return &LinkRepository{
		db: db,
	}
}

// Create the link
func (r *LinkRepository) Create(ctx context.Context, link model.Link) error {
	query := `INSERT INTO links (user_id, original_url, slug, created_at) VALUES ($1, $2, $3, $4)`
	_, err := r.db.Exec(ctx, query, link.UserID, link.OriginalURL, link.Slug, time.Now())
	return err
}

// SlugExists checks if a slug already exists
func (r *LinkRepository) SlugExists(ctx context.Context, slug string) (bool, error) {
	query := `
		SELECT COUNT(*) FROM links WHERE slug = $1 AND deleted_at IS NULL
	`
	var count int
	err := r.db.QueryRow(ctx, query, slug).Scan(&count)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}