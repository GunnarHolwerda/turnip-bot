FROM node:13-alpine
WORKDIR /usr/local/src

ENV TYPEORM_CONNECTION=postgres
ENV TYPEORM_HOST=localhost
ENV TYPEORM_USERNAME=app
ENV TYPEORM_PASSWORD=password
ENV TYPEORM_DATABASE=turnip_tracker
ENV TYPEORM_PORT=5432
ENV TYPEORM_SYNCHRONIZE=true
ENV TYPEORM_LOGGING=false
ENV TYPEORM_ENTITIES=dist/entity/**/*.js
ENV TYPEORM_MIGRATIONS=dist/migration/**/*.js
ENV TYPEORM_SUBSCRIBERS=dist/subscriber/**/*.js
ENV REDIS_HOST=localhost
ENV DISCORD_TOKEN=foo

COPY yarn.lock .
COPY package.json .
COPY ./db/wait-for-db.sh .
RUN apk add postgresql && yarn install
RUN chmod +x ./wait-for-db.sh
CMD ["./wait-for-db.sh", "yarn", "start"]