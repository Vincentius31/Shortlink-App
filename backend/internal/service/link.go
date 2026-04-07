package service

import (
    "context"
    "errors"
    "fmt"
    "math/rand"
    "os"
    "shortlink-app/internal/model"
    "shortlink-app/internal/repository"
    "time"
)

type LinkService struct {
    repo *repository.LinkRepository
}

func NewLinkService(repo *repository.LinkRepository) *LinkService {
    return &LinkService{repo: repo}
}

func getBaseURL() string {
    return fmt.Sprintf("http://%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
}

func generatedRandomSlug(length int) string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    b := make([]byte, length)
    for i := range b {
        b[i] = charset[r.Intn(len(charset))]
    }
    return string(b)
}

func (s *LinkService) Create(ctx context.Context, userID int, req model.CreateLinkRequest) (model.LinkResponse, error) {
    var slug string
    if req.Slug != "" {
        exists, err := s.repo.SlugExists(ctx, req.Slug)
        if err != nil || exists {
            return model.LinkResponse{}, errors.New("Slug already taken")
        }
        slug = req.Slug
    } else {
        for i := 0; i < 10; i++ {
            slug = generatedRandomSlug(6)
            exists, _ := s.repo.SlugExists(ctx, slug)
            if !exists {
                break
            }
        }
    }

    link := model.Link{
        UserID:      userID,
        OriginalURL: req.OriginalURL,
        Slug:        slug,
        CreatedAt:   time.Now(),
    }

    if err := s.repo.Create(ctx, link); err != nil {
        return model.LinkResponse{}, err
    }

    return model.LinkResponse{
        OriginalURL: link.OriginalURL,
        Slug:        link.Slug,
        ShortURL:    getBaseURL() + "/" + link.Slug,
        Clicks:      0,
        CreatedAt:   link.CreatedAt.Format(time.RFC3339),
    }, nil
}

func (s *LinkService) GetAll(ctx context.Context, userID int) ([]model.LinkResponse, error) {
    links, err := s.repo.GetByUserID(ctx, userID)
    if err != nil {
        return nil, err
    }

    baseURL := getBaseURL()
    var responses []model.LinkResponse
    for _, link := range links {
        responses = append(responses, model.LinkResponse{
            ID:          link.ID,
            OriginalURL: link.OriginalURL,
            Slug:        link.Slug,
            ShortURL:    baseURL + "/" + link.Slug,
            Clicks:      link.Clicks, 
            CreatedAt:   link.CreatedAt.Format(time.RFC3339),
        })
    }
    return responses, nil
}

func (s *LinkService) GetOriginalURL(ctx context.Context, slug string) (string, error) {
    originalURL, err := s.repo.GetOriginalURLAndIncrement(ctx, slug)
    if err != nil {
        return "", errors.New("Link not found")
    }
    return originalURL, nil
}

func (s *LinkService) Delete(ctx context.Context, userID, linkID int) error {
    link, err := s.repo.GetByID(ctx, linkID)
    if err != nil || link.UserID != userID {
        return errors.New("Link not found or permission denied")
    }
    return s.repo.SoftDelete(ctx, linkID)
}