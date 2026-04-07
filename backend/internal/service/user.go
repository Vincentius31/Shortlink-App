package service

import (
	"context"
	"errors"
	"os"
	"strings"
	"time"

	"shortlink-app/internal/model"
	"shortlink-app/internal/repository"

	"github.com/golang-jwt/jwt/v5"
	"github.com/matthewhartstonge/argon2"
)

func getSecret() string {
	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		return secret
	}
	return os.Getenv("APP_SECRET")
}

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{
		repo: repo,
	}
}

func validateRegister(email, password string) error {
	if !strings.Contains(email, "@") || !strings.Contains(email, ".") {
		return errors.New("Invalid email format")
	}
	if strings.Index(email, "@") > strings.Index(email, ".") {
		return errors.New("Invalid email domain format")
	}
	if len(password) < 6 {
		return errors.New("Password must be at least 6 characters")
	}
	return nil
}

func (s *UserService) Register(ctx context.Context, req model.RegisterRequest) error {
	if err := validateRegister(req.Email, req.Password); err != nil {
		return err
	}

	if req.Password != req.ConfirmPassword {
		return errors.New("Password and Confirm Password do not match!")
	}

	existingUser, _ := s.repo.GetByEmail(ctx, req.Email)
	if existingUser != nil {
		return errors.New("Email is already registered!")
	}

	argon := argon2.DefaultConfig()
	encoded, err := argon.HashEncoded([]byte(req.Password))
	if err != nil {
		return err
	}

	newUser := model.User{
		Email:        req.Email,
		PasswordHash: string(encoded),
	}

	return s.repo.Create(ctx, newUser)
}

func (s *UserService) Login(ctx context.Context, req model.LoginRequest) (model.LoginResponse, error) {
	user, err := s.repo.GetByEmail(ctx, req.Email)
	if err != nil {
		return model.LoginResponse{}, errors.New("Invalid Email or Wrong Password")
	}

	ok, err := argon2.VerifyEncoded([]byte(req.Password), []byte(user.PasswordHash))
	if err != nil || !ok {
		return model.LoginResponse{}, errors.New("Invalid Email or Wrong Password")
	}

	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Minute * 15).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := getSecret()
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return model.LoginResponse{}, err
	}

	return model.LoginResponse{
		Token:  tokenString,
		UserID: user.ID,
		Email:  user.Email,
	}, nil
}

func (s *UserService) FindByID(ctx context.Context, id int) (*model.User, error) {
	return s.repo.GetByID(ctx, id)
}
