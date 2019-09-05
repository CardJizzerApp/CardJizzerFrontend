FROM node

COPY ./www /var/server
WORKDIR /var/server

RUN npm i
RUN npm run prod


ENTRYPOINT [ "npm", "run", "start" ]
EXPOSE 8100