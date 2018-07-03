FROM node:8.11.3-alpine

RUN \
  apk add --no-cache htop bash python; \
  echo "alias ll='ls -laF --color=auto'" > ~/.bashrc;

WORKDIR /app

COPY . .

EXPOSE 3000

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

CMD ./start-dev.sh
