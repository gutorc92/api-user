FROM node:16

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/service-log

COPY package.json dist/apps/service-log/
COPY tsconfig.build.json dist/service-log/
COPY apps/service-log/tsconfig.app.json dist/apps/service-log/

EXPOSE 3000

RUN yarn --cwd dist/apps/service-log
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/service-log -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start service-log