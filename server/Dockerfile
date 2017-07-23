FROM golang:1.8-alpine

RUN apk --update add make

COPY . .go/src/github.com/davesnx/realrockstars.io/server
WORKDIR .go/src/github.com/davesnx/realrockstars.io/server

RUN make bin-build

CMD ["server"]
