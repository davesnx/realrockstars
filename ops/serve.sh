# Run it locally

docker build \
  -t davesnx/realrockstars.io \
  .

docker run -d \
  --restart=always \
  --network=intranet \
  --name app \
  -e "PORT=1234" \
  -e "ADDRESS=localhost" \
  -e "GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID" \
  -e "GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET" \
  davesnx/realrockstars.io

docker run -d \
  -e "PORT=80" \
  -e "ADDRESS=localhost" \
  -e "GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID" \
  -e "GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET" \
  davesnx/realrockstars.io
