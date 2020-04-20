#!/bin/bash
docker stop turnip-postgres
docker stop turnip-redis

docker run --rm -d \
    --name turnip-postgres \
    -e POSTGRES_PASSWORD=password \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v /Users/gunnarholwerda/Programming/turnip-bot:/var/lib/postgresql/data \
    -v /Users/gunnarholwerda/Programming/turnip-bot/db/init-db-and-user.sql:/docker-entrypoint-initdb.d/init-db-and-user.sql \
    -p 5432:5432 \
    postgres:12

docker run --rm -d \
    --name turnip-redis \
    -p 6379:6379 \
    redis:5