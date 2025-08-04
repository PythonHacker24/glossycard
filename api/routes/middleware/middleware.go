package middleware

import (
	"net/http"
	"time"

	"go.uber.org/zap"
)

func Logging(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		/* logging recieved request at the instant of receiving */
		zap.L().Info("Recieved request",
			zap.String("Method", r.Method),
			zap.String("Path", r.URL.Path),
		)

		/* return the handler */
		next(w, r)

		/* logging time taken by the request */
		zap.L().Info("Request completed",
			zap.String("Method", r.Method),
			zap.String("Path", r.URL.Path),
			zap.Duration("Duration", time.Since(start)),
		)
	})
}

func Authentication(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next(w, r)
	})
}
