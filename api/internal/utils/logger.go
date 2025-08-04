package utils

import (
	"log"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var (
	Log *zap.Logger
)

/* initializes the zap logger and provides global logging */
func InitLogger(isProduction bool, filename string, maxsize int, maxbackups int, maxage int, compress bool) {
	var encoder zapcore.Encoder
	var writeSyncer zapcore.WriteSyncer
	var logLevel zapcore.Level

	/* check if the logging level is production */
	if isProduction {
		encoder = zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig())
		logLevel = zapcore.InfoLevel
		writeSyncer = zapcore.AddSync(&lumberjack.Logger{
			Filename:   filename,
			MaxSize:    maxsize, // MB
			MaxBackups: maxbackups,
			MaxAge:     maxage, // days
			Compress:   compress,
		})
	} else {

		/* development level logging - configured for debug */
		/* set the encoder to console encoder */
		cfg := zap.NewDevelopmentEncoderConfig()
		cfg.EncodeLevel = zapcore.CapitalColorLevelEncoder
		encoder = zapcore.NewConsoleEncoder(cfg)
		logLevel = zapcore.DebugLevel
		writeSyncer = zapcore.AddSync(os.Stdout)
	}

	/* create the core */
	core := zapcore.NewCore(
		encoder,
		writeSyncer,
		logLevel,
	)

	/* create the logger */
	Log = zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	/* allow global logging with zap.L() - zap.L() is a global logger */
	zap.ReplaceGlobals(Log)

	log.Println("Initialized Zap Logger")
}
