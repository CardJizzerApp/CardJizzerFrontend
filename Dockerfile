FROM node

COPY . /var/server
WORKDIR /var/server

ENV BASE_HREF

RUN echo ${BASE_HREF}
RUN if [ "$ENV" = "staging" ]; \
	then npm install; \
	else npm install --only=production; \
    fi

RUN if [ "$ENV" = "staging" ]; \
	then BASE_HREF=/staging/; \
	else BASE_HREF=/production/; \
    fi
    

ENTRYPOINT [ "npm", "run", "start" ]
EXPOSE 8100