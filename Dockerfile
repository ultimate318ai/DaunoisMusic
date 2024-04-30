FROM node:alpine

WORKDIR /usr/app

# Install java default jdk and jre
RUN apk update && apk add openjdk17

COPY ./ /usr/app

RUN npm install

RUN npm install -g @angular/cli

CMD ["bash"]