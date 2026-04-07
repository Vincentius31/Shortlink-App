package repository

import (
	"context"
	"fmt"
	"shortlink-app/internal/model"
	"time"

	"github.com/jackc/pgx/v5"
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

// GetBySlug retrieves a link by its slug (for redirect)
func (r *LinkRepository) GetBySlug(ctx context.Context, slug string) (*model.Link, error) {
	fmt.Printf("[DEBUG] Repository GetBySlug called with slug: %s\n", slug)
	query := `
		SELECT id, user_id, original_url, slug, created_at, deleted_at
		FROM links
		WHERE slug = $1 AND deleted_at IS NULL
	`
	rows, err := r.db.Query(ctx, query, slug)
	if err != nil {
		fmt.Printf("[DEBUG] Query error: %v\n", err)
		return nil, err
	}
	defer rows.Close()

	link, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.Link])
	if err != nil {
		fmt.Printf("[DEBUG] CollectOneRow error: %v\n", err)
		return nil, err
	}
	fmt.Printf("[DEBUG] Found link in DB: %+v\n", link)
	return &link, nil
}

// GetByUserID retrieves all links for a user
func (r *LinkRepository) GetByUserID(ctx context.Context, userID int) ([]model.Link, error) {
	query := `
		SELECT id, user_id, original_url, slug, created_at, deleted_at
		FROM links
		WHERE user_id = $1 AND deleted_at IS NULL
		ORDER BY created_at DESC
	`
	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	links, err := pgx.CollectRows(rows, pgx.RowToStructByName[model.Link])
	if err != nil {
		fmt.Printf("[DEBUG] CollectRows error: %v\n", err)
		return nil, err
	}
	return links, nil
}

// GetByID retrieves a link by ID (for ownership check)
func (r *LinkRepository) GetByID(ctx context.Context, id int) (*model.Link, error) {
	query := `
		SELECT id, user_id, original_url, slug, created_at, deleted_at
		FROM links
		WHERE id = $1
	`
	rows, err := r.db.Query(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	link, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[model.Link])
	if err != nil {
		return nil, err
	}
	return &link, nil
}

// SoftDelete marks a link as deleted
func (r *LinkRepository) SoftDelete(ctx context.Context, id int) error {
	query := `
		UPDATE links
		SET deleted_at = $1
		WHERE id = $2
	`
	_, err := r.db.Exec(ctx, query, time.Now(), id)
	return err
}