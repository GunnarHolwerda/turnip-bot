FROM node:13-alpine
WORKDIR /usr/local/src

COPY yarn.lock .
RUN yarn install
COPY dist/ dist/
CMD ["yarn", "start"]