package di

import (
	"shortlink-app/internal/handlers"
	"shortlink-app/internal/repository"
	"shortlink-app/internal/service"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Container struct {
	pool *pgxpool.Pool

	//Users
	userRepo    *repository.UserRepository
	userService *service.UserService
	authHandler *handlers.AuthHandler

	//Links
	linkRepo    *repository.LinkRepository
	linkService *service.LinkService
	linkHandler *handlers.LinkHandler
}

func NewContainer(pool *pgxpool.Pool) *Container {
	container := &Container{
		pool: pool,
	}

	container.initDependencies()

	return container
}

func (c *Container) initDependencies() {
	//Users
	c.userRepo = repository.NewUserRepository(c.pool)
	c.userService = service.NewUserService(c.userRepo)
	c.authHandler = handlers.NewAuthHandler(c.userService)

	//Links
	c.linkRepo = repository.NewLinkRepository(c.pool)
	c.linkService = service.NewLinkService(c.linkRepo)
	c.linkHandler = handlers.NewLinkHandler(c.linkService)
}

func (c *Container) AuthHandler() *handlers.AuthHandler {
	return c.authHandler
}

func (c *Container) LinkHandler() *handlers.LinkHandler {
	return c.linkHandler
}
