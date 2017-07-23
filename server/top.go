package main

import (
	"context"
	"fmt"
	"net/http"
)

// TopController ...
func TopController(w http.ResponseWriter, r *http.Request) {
	// Get top 20 rockstar repos
	ctx := context.Background()

	response, _, _ := githubClient.Search.Repositories(ctx, "stars:>=500", nil)

	fmt.Println(len(response.Repositories))
}
