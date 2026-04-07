package routes

import (
	"shortlink-app/internal/di"
	"shortlink-app/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SetupRoutes(r *gin.Engine, conn *pgxpool.Pool) {
	container := di.NewContainer(conn)

	authHandler := container.AuthHandler()
	linkHandler := container.LinkHandler()

	authRoutes := r.Group("/api")
	{
		authRoutes.POST("/register", authHandler.Register)
		authRoutes.POST("/login", authHandler.Login)
	}

	linkRoutes := r.Group("/api")
	linkRoutes.Use(middleware.AuthMiddleware())
	{
		linkRoutes.POST("/links", linkHandler.Create)
		linkRoutes.GET("/links", linkHandler.GetAll)
		linkRoutes.DELETE("/links/:id", linkHandler.Delete)
	}
}