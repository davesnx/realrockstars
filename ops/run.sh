docker network create intranet

docker stop proxy
docker rm proxy

docker run -d \
  --name proxy \
  --restart=always \
  --network=intranet \
  -p 80:80 -p 443:443 \
  -v /home/david/ops/CaddyfileProxy:/etc/Caddyfile \
  -v /home/david/volumes/proxy/caddy:/root/.caddy \
  abiosoft/caddy

docker run -d --name app \
  -p 80:8000 \
  --restart=always \
  --network=intranet \
  crccheck/hello-world

docker pull davesnx/realrockstars.io
