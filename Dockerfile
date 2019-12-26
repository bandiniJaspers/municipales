FROM node:13.5.0-alpine as build
EXPOSE 3000
WORKDIR /app
COPY package.json /app
RUN npm install
