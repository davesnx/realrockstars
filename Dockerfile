FROM mhart/alpine-node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

RUN npm run build:server:prod
RUN npm run build:client:prod

EXPOSE 1234
CMD ["npm", "run", "serve"]
