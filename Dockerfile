FROM node:alpine

WORKDIR /opt/Astraea/build

RUN apk update
RUN apk add mongodb-tools

COPY . .
RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT ["node", "."]
