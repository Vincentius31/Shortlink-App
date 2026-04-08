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

	api := r.Group("/api")
	{
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)

		protected := api.Group("")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.GET("/me", authHandler.Me)
			protected.POST("/profile/update", authHandler.UpdateProfile)

			protected.POST("/links", linkHandler.Create)
			protected.GET("/links", linkHandler.GetAll)
			protected.DELETE("/links/:id", linkHandler.Delete)
		}
	}
	r.GET("/:slug", linkHandler.Redirect)
}
