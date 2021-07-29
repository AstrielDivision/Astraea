FROM node:alpine

RUN apk update && apk add libtool autoconf automake g++ gcc git make

WORKDIR /opt/build/north

COPY . .
RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT [ "node", "." ]
