FROM node:alpine

RUN apk update && apk add git

WORKDIR /opt/Astraea/build

COPY . .
RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT [ "node", "." ]
