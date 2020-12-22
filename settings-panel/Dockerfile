FROM node:14.15.3-buster-slim as build

RUN mkdir -p /app/node_modules \
  && chown -R node:node /app
WORKDIR /app
USER node

COPY --chown=node:node package*.json /app
RUN [ "npm", "install" ]

COPY --chown=node:node . .

RUN [ "yarn", "build" ]
CMD [ "yarn", "start" ]

FROM nginx:1.19.6 as stage
WORKDIR /usr/share/nginx/html

COPY --from=build --chown=nginx:nginx /app/build/ /usr/share/nginx/html/

EXPOSE 80

CMD nginx -g 'daemon off;'