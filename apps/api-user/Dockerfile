FROM node:16

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/api-user

COPY package.json dist/apps/api-user/
COPY tsconfig.build.json dist/api-user/
COPY apps/api-user/tsconfig.app.json dist/apps/api-user/

EXPOSE 3000

RUN yarn --cwd dist/apps/api-user
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/api-user -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start api-user