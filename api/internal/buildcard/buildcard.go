package buildcard

import (
	"encoding/json"
	"io"
	"net/http"
)

func CreateCard(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}

	var card CardSpecs
	json.Unmarshal(body, &card)
}
