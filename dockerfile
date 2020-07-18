FROM node:latest

WORKDIR /app

COPY . .

ENV PORT=3001

RUN npm install

EXPOSE ${PORT}

ENTRYPOINT [ "node" ,"src/server.js"]