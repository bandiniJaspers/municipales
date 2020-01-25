FROM node:11 as build
EXPOSE 3000
WORKDIR /app
COPY . .
RUN npm install
RUN npm rebuild node-sass
