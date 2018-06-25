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

docker run -d \
  --restart=always \
  --network=intranet \
  --name app \
  -p 1234:1234 \
  davesnx/realrockstars.io:ea8a2475db7a0cdb11bc2c2115ab07594c7fbc22

docker pull davesnx/realrockstars.io
