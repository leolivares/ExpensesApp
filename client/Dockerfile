# pull official base image
FROM node:latest

# set working directory
WORKDIR /home/node/app/client

ENV PATH /home/node/app/client/node_modules/.bin:$PATH


# install app dependencies
COPY package*.json ./
RUN npm install
# RUN npm install react-scripts@3.4.0 -g --silent

# add app
COPY . .


EXPOSE 3001

# start app
CMD ["npm", "start"]