FROM node:7
WORKDIR /app
COPY package.json /app
COPY . /app
CMD node server.js
EXPOSE 3000

