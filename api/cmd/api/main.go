package main

import (
	"api/internal/utils"
	"api/routes/endpoints"
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"go.uber.org/zap"
)

func main() {
	if err := exec(); err != nil {
		os.Exit(1)
	}
}

func exec() error {

	utils.InitLogger(false, "logs/api.log", 100, 30, 30, true)

	zap.L().Info("Logger Started")

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt, syscall.SIGTERM)

	go func() {
		<-interrupt
		cancel()
	}()

	return run(ctx)
}

func run(ctx context.Context) error {

	host := ""
	port := 8080

	mux := http.NewServeMux()

	endpoints.Endpoints(mux)

	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", host, port),
		Handler: mux,
	}

	go func() {
		zap.L().Info("HTTP REST API server starting",
			zap.String("Host", host),
			zap.Int("Port", port),
		)
		if err := server.ListenAndServe(); err != http.ErrServerClosed {
			zap.L().Error("ListenAndServe error",
				zap.Error(err),
			)
		}
	}()

	<-ctx.Done()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		zap.L().Error("HTTP server shutdown error",
			zap.Error(err),
		)
	}

	zap.L().Info("HTTP server stopped")

	return nil
}
