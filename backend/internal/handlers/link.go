package handlers

import (
	"net/http"
	"shortlink-app/internal/model"
	"shortlink-app/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type LinkHandler struct {
	linkService *service.LinkService
}

func NewLinkHandler(ls *service.LinkService) *LinkHandler {
	return &LinkHandler{
		linkService: ls,
	}
}

func (h *LinkHandler) Create(ctx *gin.Context) {
	var req model.CreateLinkRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, model.WebResponse{
			Success: false,
			Message: "Unauthorized, Please Login first!",
			Results: nil,
		})
		return
	}

	response, err := h.linkService.Create(ctx.Request.Context(), userID.(int), req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusCreated, model.WebResponse{
		Success: true,
		Message: "Link created successfully",
		Results: response,
	})
}

func (h *LinkHandler) GetAll(ctx *gin.Context) {
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, model.WebResponse{
			Success: false,
			Message: "Unauthorized",
			Results: nil,
		})
		return
	}

	links, err := h.linkService.GetAll(ctx.Request.Context(), userID.(int))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, model.WebResponse{
		Success: true,
		Message: "Links retrieved successfully",
		Results: links,
	})
}

// Delete soft deletes a link
func (h *LinkHandler) Delete(ctx *gin.Context) {
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, model.WebResponse{
			Success: false,
			Message: "Unauthorized",
			Results: nil,
		})
		return
	}

	linkIDStr := ctx.Param("id")
	linkID, err := strconv.Atoi(linkIDStr)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, model.WebResponse{
			Success: false,
			Message: "Invalid link ID",
			Results: nil,
		})
		return
	}

	if err := h.linkService.Delete(ctx.Request.Context(), userID.(int), linkID); err != nil {
		ctx.JSON(http.StatusForbidden, model.WebResponse{
			Success: false,
			Message: err.Error(),
			Results: nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, model.WebResponse{
		Success: true,
		Message: "Link deleted successfully",
		Results: nil,
	})
}

// Redirect handles the short URL redirect
func (h *LinkHandler) Redirect(ctx *gin.Context) {
	slug := ctx.Param("slug")

	originalURL, err := h.linkService.GetOriginalURL(ctx.Request.Context(), slug)
	if err != nil {
		ctx.JSON(http.StatusNotFound, model.WebResponse{
			Success: false,
			Message: "Link not found",
			Results: nil,
		})
		return
	}

	
	ctx.Redirect(http.StatusFound, originalURL)
}
