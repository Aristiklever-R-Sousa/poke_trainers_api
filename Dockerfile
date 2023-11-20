FROM node:20 as base

WORKDIR /home/node/app

COPY . .
# COPY ../../package.json ./

# COPY yarn.json ./
RUN yarn install

FROM base as production

ENV NODE_PATH=./build

RUN yarn build
