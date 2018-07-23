FROM mhart/alpine-node:10

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ENV NODE_ENV=production

RUN yarn run build:server:prod
RUN yarn run build:client:prod

EXPOSE 80
CMD ["yarn", "serve"]
