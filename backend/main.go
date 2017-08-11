package main

import (
	"fmt"
	"log"

	"github.com/google/go-github/github"

	"net/http"
)

var port = ":9090"
var githubClient = github.NewClient(nil)

func okController(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusOK)
	return
}

func main() {
	http.HandleFunc("/", okController)
	http.HandleFunc("/top", TopController)
	http.HandleFunc("/repo", RepoController)

	fmt.Println("Server running on localhost", port)
	err := http.ListenAndServe(port, nil)

	if err != nil {
		log.Fatal(err)
	}
}
