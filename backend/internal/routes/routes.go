package routes

import (
	"shortlink-app/internal/di"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SetupRoutes(r *gin.Engine, conn *pgxpool.Pool) {
	container := di.NewContainer(conn)

	authHandler := container.AuthHandler()

	authRoutes := r.Group("/auth")
	{
		authRoutes.POST("/register", authHandler.Register)
		authRoutes.POST("/login", authHandler.Login)
	}
}