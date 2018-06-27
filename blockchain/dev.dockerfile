FROM node:8.11.3-alpine

RUN \
  yarn global add nodemon@1.17.5; \
  apk add --no-cache htop bash; \
  echo "alias ll='ls -laF --color=auto'" > ~/.bashrc;

WORKDIR /app

COPY . .

EXPOSE 3000
CMD ./start-dev.sh
