FROM node


RUN npm i
RUN npm run prod

COPY ./www /var/server

WORKDIR /var/server

ENTRYPOINT [ "npm", "run", "start" ]
EXPOSE 8100