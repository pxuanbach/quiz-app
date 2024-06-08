FROM node:16-alpine

ENV APP_PORT=9001

WORKDIR /app

COPY . /app

RUN npm ci

EXPOSE $APP_PORT

CMD ["npm", "run", "dev"]
