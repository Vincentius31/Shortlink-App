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