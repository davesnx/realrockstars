FROM mhart/alpine-node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app
RUN npm install
COPY . /usr/src/app

ARG ADDRESS
ARG PORT
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET

RUN npm run build:server:prod
RUN npm run build:client:prod

EXPOSE 80
CMD ["npm", "run", "serve"]
