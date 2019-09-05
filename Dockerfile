FROM node

COPY . /var/server
WORKDIR /var/server

RUN npm i

ENTRYPOINT [ "npm", "run", "start" ]
EXPOSE 8100