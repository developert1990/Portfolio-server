FROM node:alpine
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY . ./
EXPOSE 7777
CMD [ "node","index.js" ]