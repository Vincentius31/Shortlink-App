package repository

import (
    "context"
    "shortlink-app/internal/model"
    "time"

    "github.com/jackc/pgx/v5"
    "github.com/jackc/pgx/v5/pgxpool"
)

type LinkRepository struct {
    db *pgxpool.Pool
}

func NewLinkRepository(db *pgxpool.Pool) *LinkRepository {
    return &LinkRepository{db: db}
}

func (r *LinkRepository) Create(ctx context.Context, link model.Link) error {
    query := `INSERT INTO links (user_id, original_url, slug, created_at) VALUES ($1, $2, $3, $4)`
    _, err := r.db.Exec(ctx, query, link.UserID, link.OriginalURL, link.Slug, time.Now())
    return err
}

func (r *LinkRepository) SlugExists(ctx context.Context, slug string) (bool, error) {
    query := `SELECT COUNT(*) FROM links WHERE slug = $1 AND deleted_at IS NULL`
    var count int
    err := r.db.QueryRow(ctx, query, slug).Scan(&count)
    return count > 0, err
}

func (r *LinkRepository) GetOriginalURLAndIncrement(ctx context.Context, slug string) (string, error) {
    query := `
        UPDATE links 
        SET clicks = clicks + 1 
        WHERE slug = $1 AND deleted_at IS NULL 
        RETURNING original_url
    `
    var originalURL string
    err := r.db.QueryRow(ctx, query, slug).Scan(&originalURL)
    if err != nil {
        return "", err
    }
    return originalURL, nil
}

func (r *LinkRepository) GetByUserID(ctx context.Context, userID int) ([]model.Link, error) {
    query := `
        SELECT id, user_id, original_url, slug, clicks, created_at, deleted_at
        FROM links
        WHERE user_id = $1 AND deleted_at IS NULL
        ORDER BY created_at DESC
    `
    rows, err := r.db.Query(ctx, query, userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    return pgx.CollectRows(rows, pgx.RowToStructByName[model.Link])
}

func (r *LinkRepository) GetByID(ctx context.Context, id int) (*model.Link, error) {
    query := `
        SELECT id, user_id, original_url, slug, clicks, created_at, deleted_at
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

func (r *LinkRepository) SoftDelete(ctx context.Context, id int) error {
    query := `UPDATE links SET deleted_at = $1 WHERE id = $2`
    _, err := r.db.Exec(ctx, query, time.Now(), id)
    return err
}