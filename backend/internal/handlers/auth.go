package handlers

import (
	"fmt"
	"net/http"
	"shortlink-app/internal/model"
	"shortlink-app/internal/service"
	"time"

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

func (h *AuthHandler) Me(ctx *gin.Context) {
	userID, _ := ctx.Get("user_id")

	profile, err := h.userService.GetProfile(ctx.Request.Context(), userID.(int))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, model.WebResponse{
			Success: false,
			Message: "Gagal mengambil data profil: " + err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, model.WebResponse{
		Success: true,
		Message: "Profile retrieved successfully",
		Results: profile,
	})
}

func (h *AuthHandler) UpdateProfile(ctx *gin.Context) {
	val, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, model.WebResponse{Success: false, Message: "Unauthorized"})
		return
	}

	var userID int
	switch v := val.(type) {
	case int:
		userID = v
	case float64:
		userID = int(v)
	default:
		ctx.JSON(http.StatusInternalServerError, model.WebResponse{Success: false, Message: "Invalid User ID type"})
		return
	}

	fullName := ctx.PostForm("full_name")
	bio := ctx.PostForm("bio")

	file, err := ctx.FormFile("avatar")
	var avatarPath string

	current, _ := h.userService.GetProfile(ctx.Request.Context(), userID)
	if current != nil {
		avatarPath = current.ProfilePicture
	}

	if err == nil {
		path := fmt.Sprintf("uploads/%d_%d_%s", userID, time.Now().Unix(), file.Filename)
		if err := ctx.SaveUploadedFile(file, path); err == nil {
			avatarPath = path
			fmt.Printf("New Photo: %s\n", avatarPath)
		}
	}

	err = h.userService.UpdateProfile(ctx.Request.Context(), userID, fullName, bio, avatarPath)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, model.WebResponse{Success: false, Message: err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, model.WebResponse{
		Success: true,
		Message: "Profile updated successfully",
		Results: map[string]string{"avatar_url": avatarPath},
	})
}
