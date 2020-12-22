FROM node:14.15.3-buster-slim

RUN mkdir -p /app/logs \
  && mkdir -p /app/node_modules \
  && chown -R node:node /app

WORKDIR /app

USER node
COPY --chown=node:node package*.json /app/
RUN [ "npm", "install" ]
COPY --chown=node:node . .
RUN [ "npm", "run", "compile" ]
CMD npm run dev > /app/logs/access.log 2> /app/logs/error.log
