package model

import "time"

type Link struct {
	ID          int        `json:"id" db:"id"`
	UserID      int        `json:"user_id" db:"user_id"`
	OriginalURL string     `json:"original_url" db:"original_url"`
	Slug        string     `json:"slug" db:"slug"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty" db:"deleted_at"`
}

type CreateLinkRequest struct {
	OriginalURL string `json:"original_url" binding:"required,url"`
	Slug        string `json:"slug" binding:"omitempty,alphanum,min=3,max=50"`
}

type LinkResponse struct {
	ID          int    `json:"id"`
	OriginalURL string `json:"original_url"`
	Slug        string `json:"slug"`
	ShortURL    string `json:"short_url"`
	CreatedAt   string `json:"created_at"`
}
