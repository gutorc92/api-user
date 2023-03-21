FROM node:16

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/api-log

COPY package.json dist/apps/api-log/
COPY tsconfig.build.json dist/api-log/
COPY apps/api-user/tsconfig.app.json dist/apps/api-log/

EXPOSE 3000

RUN yarn --cwd dist/apps/api-log
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/api-log -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start api-log