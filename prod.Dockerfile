FROM node:alpine

WORKDIR /opt/Astraea/build

COPY . .

RUN apk update

## MongoDB tools. For exporting, importing data, etc (https://docs.mongodb.com/database-tools/)
RUN apk add mongodb-tools

RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT ["node", "."]
