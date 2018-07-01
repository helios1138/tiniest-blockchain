FROM node:8.11.3-alpine as build

WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM node:8.11.3-alpine

RUN yarn global add serve@9.1.0

COPY --from=build /app/build /app

EXPOSE 3000
CMD serve -l 3000 -s /app
