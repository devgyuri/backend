# # 1. 운영체제 및 프로그램 설치
# FROM unbuntu:22.04

# # 2. node.js yarn 설치
# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn


# 1. 운영체제 및 프로그램 설치
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사
COPY ./index.js /index.js

# 3. 도커 안에서 index.js 실행
CMD node index.js
