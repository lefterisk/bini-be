FROM node:8.7.0
MAINTAINER Lefteris Kokkonas <lefteris.kokkonas@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN DEBIAN_FRONTEND=noninteractive apt-get update -qq && apt-get install -qq wget unzip -y

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Add Docker entrypoint
ADD ./entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod a+x /usr/local/bin/*

# Install application
ADD ./package.json /usr/src/app/package.json
RUN npm install
ADD ./dist /usr/src/app/dist

EXPOSE 3000

CMD ["/usr/local/bin/entrypoint.sh"]