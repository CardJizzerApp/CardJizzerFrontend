FROM node

COPY . /var/server
WORKDIR /var/server

RUN npm i
RUN npm run start

ENTRYPOINT [ "npm", "run", "start" ]
EXPOSE 8100