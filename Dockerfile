FROM node:14.15.4-alpine
LABEL maintainer="Sangmean Hong"
WORKDIR /app
COPY /package*.json ./
RUN npm install
COPY . ./
EXPOSE 7777
CMD [ "npm","start" ]  
# ENTRYPOINT 와 CMD는 해당 컨테이너가 수행하게 될 실행 명령을 정의하는 선언문
# ENTRYPOINT 와 CMD 의 가장 큰 차이점은 바로 컨테이너 시작시 실행 명령에 대한 Default 지정 여부
# CMD 실행명령어 치는건데 npm start 이렇게 해도 package.json 에 "start": "babel-node index.js", 이게 동작을 한다. 