FROM node:13-slim
WORKDIR /usr/local/src

COPY yarn.lock .
RUN yarn install
COPY dist/ dist/
CMD ["yarn", "start"]