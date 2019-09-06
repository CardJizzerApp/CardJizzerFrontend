FROM node

COPY . /var/server
WORKDIR /var/server

ENV BASE_HREF /
ENV NODE_ENV staging

RUN echo ${BASE_HREF}
RUN if [ "$NODE_ENV" = "staging" ]; \
	then npm install; \
	else npm install --only=production; \
    fi

RUN if [ "$ENV" = "staging" ]; \
	then BASE_HREF=/staging/; \
	else BASE_HREF=/production/; \
    fi
    

ENTRYPOINT [ "npm", "run", "start" ]
EXPOSE 8100