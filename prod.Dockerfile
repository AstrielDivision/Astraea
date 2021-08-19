FROM node:alpine

WORKDIR /opt/Astraea/build

COPY . .

## Install mongosh. Used to connect to the mongodb database. Looking into data etc
RUN wget https://downloads.mongodb.com/compass/mongosh-1.0.5-linux-x64.tgz -O mongosh
RUN tar -zxvf mongosh
RUN cd mongosh-1.0.5-linux-x64 && cd bin
COPY . /usr/local/bin
RUN cd ../.. && rm -rf mongosh

RUN apk update

## MongoDB tools. For exporting, importing data, etc (https://docs.mongodb.com/database-tools/)
RUN apk add mongodb-tools

RUN yarn
RUN yarn build

RUN rm -rf src
RUN yarn cache clean

ENTRYPOINT ["node", "."]
