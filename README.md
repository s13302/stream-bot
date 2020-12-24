# Twitch Bot with chat overlay ability

This software is a twitch bot which you can run on your local machine in Docker container. This bot has some standard commands, but you can add your custom commands. This bot is used on [#ProgrammingExperience](https://twitch.tv/programmingexperience/) twitch channel.

## Installation

You need to install docker on your local machine first. After this you need to copy or rename file `.env.SAMPLE` to `.env` and provide some environment variables.

### Environment variables

* `SERVER_PORT` a port which the backend server run.
* `LOG_LEVEL` a logging level for backend server, please refer to [pino](https://github.com/pinojs/pino) library.
* `MONGO_URL` an url to mongo database. You are able to use external mongo database.
* `MONGO_VERSION` a version of mongo database. It is an information for docker compose which version of mongo should be used.
* `MONGO_DB_NAME` a name of database which should be used by bot.
* `MONGO_ROOT_USER` a name of root user for mongo database.
* `MONGO_ROOT_PASS` a password for root mongo user.
* `TWITCH_CLIENT_ID` a twitch client id. You can refer to this docs: [Twitch Registration](https://dev.twitch.tv/docs/authentication#registration).
* `TWITCH_REDIRECT_URI` a callback URL which twitch using to resend an access_token.
* `TWITCH_CLIENT_SECRET` a secret generated with client id.

## Using

When installation is done you can simply run command `docker-compose up -d`. It will run your application on your local machine and you will get an access to [settings panel](http://localhost:8090/) and [chat overlay](http://localhost:8080/). You can modify these settings and deploy it on VPS or other ports.
