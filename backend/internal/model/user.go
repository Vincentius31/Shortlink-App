package model

import "time"

type User struct {
	ID             int       `json:"id" db:"id"`
	Email          string    `json:"email" db:"email"`
	PasswordHash   string    `json:"-" db:"password_hash"`
	FullName       *string   `json:"full_name" db:"full_name"`
	Bio            *string   `json:"bio" db:"bio"`
	ProfilePicture *string   `json:"profile_picture" db:"profile_picture"`
	CreatedAt      time.Time `json:"created_at" db:"created_at"`
}

type UserProfileResponse struct {
	Email          string `json:"email"`
	FullName       string `json:"full_name"`
	Bio            string `json:"bio"`
	ProfilePicture string `json:"profile_picture"`
	LinkCount      int    `json:"link_count"`
	CreatedAt      string `json:"created_at"`
}

type RegisterRequest struct {
	Email           string `json:"email" binding:"required"`
	Password        string `json:"password" binding:"required"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UserBrief struct {
	ID    int    `json:"user_id"`
	Email string `json:"email"`
}

type LoginResponse struct {
	Token string    `json:"token"`
	User  UserBrief `json:"user"`
}
