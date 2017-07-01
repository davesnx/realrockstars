package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/google/go-github/github"

	"net/http"
	"net/url"
)

// Repo ...
type Repo struct {
	URL           url.URL
	Name          string
	Org           string
	RockstarLevel float64
	Stars         int
	Lines         int
}

var port = ":9090"
var githubClient = github.NewClient(nil)

// HomeController ...
func HomeController(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	response, _, _ := githubClient.Search.Repositories(ctx, "stars:>=500", nil)

	fmt.Println(len(response.Repositories))
}

func lines(ctx context.Context, org string, name string, channel chan int) {
	stats, _, err := githubClient.Repositories.ListContributorsStats(ctx, org, name)
	if err != nil {
		panic(err)
	}

	linesOfCode := 0

	for _, stat := range stats {
		for _, week := range stat.Weeks {
			linesOfCode += week.GetAdditions() - week.GetDeletions()
		}
	}

	channel <- linesOfCode
}

func stars(ctx context.Context, org string, name string, channel chan int) {
	repo, _, err := githubClient.Repositories.Get(ctx, org, name)
	if err != nil {
		panic(err)
	}

	channel <- repo.GetStargazersCount()
}

// RepoController ...
func RepoController(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	values := r.URL.Query()

	repo := Repo{
		Org:  values["org"][0],
		Name: values["name"][0],
	}

	linesChan := make(chan int)
	starsChan := make(chan int)

	go lines(ctx, repo.Org, repo.Name, linesChan)
	go stars(ctx, repo.Org, repo.Name, starsChan)

	repo.Stars = <-starsChan
	repo.Lines = <-linesChan
	repo.RockstarLevel = float64(repo.Stars) / float64(repo.Lines)

	w.Header().Set("content-type", "application/json")
	payload, _ := json.Marshal(repo)
	w.Write(payload)
}

func main() {
	http.HandleFunc("/", HomeController)
	http.HandleFunc("/repo", RepoController)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
