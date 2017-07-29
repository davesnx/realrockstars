package main

import (
	"context"
	"fmt"
	"net/http"
)

// TopController Get top 30 rockstar repos
func TopController(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	response, _, _ := githubClient.Search.Repositories(ctx, "stars:>=500", nil)

	repoCount := len(response.Repositories)

	payload := make([]Repo, repoCount)

	for i := 0; i < repoCount; i++ {
		repo := response.Repositories[i]
		info, err := getRepoInfo(ctx, *repo.Owner.Login, *repo.Name)
		payload = append(payload, info)
		if err != nil {
			fmt.Fprintln(w, err.Error())
		}
	}

	fmt.Println(payload)

	// w.Header().Set("content-type", "application/json")
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.WriteHeader(http.StatusOK)
	// w.Write(json.Unmarshal(payload))
}
