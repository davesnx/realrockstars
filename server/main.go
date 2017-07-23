package main

import (
	"log"

	"github.com/google/go-github/github"

	"net/http"
)

// Repo ...
type Repo struct {
	URL           string
	Name          string
	Org           string
	OrgAvatar     string
	Language      string
	Stars         int
	Lines         int
	Description   string
	RockstarLevel float64
}

var port = ":9090"
var githubClient = github.NewClient(nil)

func main() {
	http.HandleFunc("/top", TopController)
	http.HandleFunc("/repo", RepoController)

	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal("ListenAndServe on", port, err)
	}
}
