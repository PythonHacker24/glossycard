package endpoints

import (
	"api/internal/buildcard"
	"api/routes/middleware"
	"net/http"
)

func Endpoints(mux *http.ServeMux) {
	prefix := "/api/v1"

	mux.HandleFunc("POST"+prefix+"/create",
		middleware.Logging(
			middleware.Authentication(
				buildcard.CreateCard,
			),
		),
	)
}
