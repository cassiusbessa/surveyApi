FROM node:19
WORKDIR /app/src/survey-api
COPY package*.json .
RUN npm install --only=prod
