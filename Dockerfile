FROM node:alpine

WORKDIR /opt/Astraea/build

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories

RUN apk update
RUN apk add mongodb-tools mongodb

COPY . .
RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT ["node", "."]
