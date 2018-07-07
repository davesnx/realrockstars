docker network create intranet

docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  v2tec/watchtower

docker run -d \
  --name proxy \
  --restart=always \
  --network=intranet \
  -p 80:80 -p 443:443 \
  -v /home/david/ops/CaddyfileProxy:/etc/Caddyfile \
  -v /home/david/volumes/proxy/caddy:/root/.caddy \
  abiosoft/caddy

docker run -d \
  --restart=always \
  --network=intranet \
  --name app \
  -p 1234:1234 \
  davesnx/realrockstars.io

# Run it locally
docker build --build-arg address=localhost --build-arg port=1234 -t app .
