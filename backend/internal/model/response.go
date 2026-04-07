package model

type WebResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Results    any    `json:"results"`
}