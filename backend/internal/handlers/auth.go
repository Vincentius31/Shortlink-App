package handlers

import (
	"net/http"
	"shortlink-app/internal/model"
	"shortlink-app/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	userService *service.UserService
}

func NewAuthHandler(us *service.UserService) *AuthHandler {
	return &AuthHandler{
		userService: us,
	}
}

func (h *AuthHandler) Register(ctx *gin.Context) {
	var req model.RegisterRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	if err := h.userService.Register(ctx.Request.Context(), req); err != nil {
		statusCode := http.StatusInternalServerError
		if err.Error() == "Email is already registered!" {
			statusCode = http.StatusConflict
		} else {
			statusCode = http.StatusBadRequest
		}

		ctx.JSON(statusCode, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusCreated, model.WebResponse{
		Success: true,
		Message: "User created successfully",
		Results: nil,
	})
}

func (h *AuthHandler) Login(ctx *gin.Context) {
	var req model.LoginRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, model.WebResponse{
			Success: false,
			Message: "Email and password are required",
			Results: nil,
		})
		return
	}

	response, err := h.userService.Login(ctx.Request.Context(), req)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, model.WebResponse{
		Success: true,
		Message: "Login successful",
		Results: response,
	})
}
