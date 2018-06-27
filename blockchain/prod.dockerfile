FROM node:8.11.3-alpine

WORKDIR /app

COPY . .

RUN yarn && yarn build

EXPOSE 3000
CMD node ./dist
