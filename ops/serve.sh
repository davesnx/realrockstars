# Run it locally

docker build \
  --build-arg PORT=1234 \
  --build-arg ADDRESS=localhost \
  --build-arg GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID \
  --build-arg GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET \
  -t davesnx/realrockstars.io \
  .

docker run -d \
  --restart=always \
  --network=intranet \
  --name app \
  davesnx/realrockstars.io
