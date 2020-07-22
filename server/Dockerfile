FROM node:latest
WORKDIR /home/node/app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm" , "run", "start"]