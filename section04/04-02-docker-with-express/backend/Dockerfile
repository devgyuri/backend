FROM node:14

# RUN mkdir myFolder
COPY . /myFolder/
WORKDIR /myFolder/
RUN yarn install

CMD yarn start:dev index.js
