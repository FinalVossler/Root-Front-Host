FROM node:latest

WORKDIR /usr/src/Root-Front-Host

COPY ./package*.json .

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]

