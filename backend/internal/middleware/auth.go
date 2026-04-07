package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"shortlink-app/internal/model"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func getSecret() string {
	if secret := os.Getenv("JWT_SECRET"); secret != "" {
		return secret
	}
	return os.Getenv("APP_SECRET")
}

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" {
			ctx.JSON(http.StatusUnauthorized, model.WebResponse{
				Success: false,
				Message: "Authorization header is required",
				Results:    nil,
			})
			ctx.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			ctx.JSON(http.StatusUnauthorized, model.WebResponse{
				Success: false,
				Message: "Invalid authorization format. Please use 'Bearer <token>'",
				Results:    nil,
			})
			ctx.Abort()
			return
		}

		tokenString := parts[1]
		secret := getSecret()

		token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
			if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", t.Header["alg"])
			}
			return []byte(secret), nil
		})

		if err != nil || !token.Valid {
			ctx.JSON(http.StatusUnauthorized, model.WebResponse{
				Success: false,
				Message: "Invalid or expired token",
				Results:    nil,
			})
			ctx.Abort()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if ok && token.Valid {
			userID := int(claims["user_id"].(float64))
			ctx.Set("user_id", userID)
			ctx.Set("email", claims["email"])
		}
		ctx.Next()
	}
}