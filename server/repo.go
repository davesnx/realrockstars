package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

// RepoController ...
func RepoController(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	values := r.URL.Query()

	organitzation := values["org"][0]
	repositoryName := values["name"][0]

	repo, err := getRepoInfo(ctx, organitzation, repositoryName)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprint(w, err.Error())
	}

	w.Header().Set("content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload, _ := json.Marshal(repo)
	w.WriteHeader(http.StatusOK)
	w.Write(payload)
}

func calculateRockStarLevel(repository Repo) float64 {
	return float64(repository.Stars) / float64(repository.Lines)
}

func getRepoInfo(ctx context.Context, org string, name string) (Repo, error) {
	stats, _, err := githubClient.Repositories.ListContributorsStats(ctx, org, name)
	if err != nil {
		return Repo{}, err
	}

	linesOfCode := 0

	for _, stat := range stats {
		for _, week := range stat.Weeks {
			linesOfCode += week.GetAdditions() - week.GetDeletions()
		}
	}

	remoteData, _, err := githubClient.Repositories.Get(ctx, org, name)
	if err != nil {
		return Repo{}, err
	}

	repo := Repo{
		URL:         *remoteData.HTMLURL,
		Description: *remoteData.Description,
		OrgAvatar:   *remoteData.Owner.AvatarURL,
		Language:    *remoteData.Language,
		Stars:       remoteData.GetStargazersCount(),
		Lines:       linesOfCode,
	}

	repo.RockstarLevel = calculateRockStarLevel(repo)

	return repo, nil
}
