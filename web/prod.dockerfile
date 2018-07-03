FROM node:8.11.3-alpine as build

ARG REACT_APP_BACKEND_URL

RUN apk add --no-cache python make g++

WORKDIR /app

COPY . .

ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN yarn && yarn build

FROM node:8.11.3-alpine

RUN yarn global add serve@9.1.2

COPY --from=build /app/build /app

EXPOSE 3000

CMD serve -l 3000 -s /app
