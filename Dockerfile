FROM node:alpine

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

# Install java default jdk and jre
RUN apt-get update && apt-get install default-jre -y \
&& apt-get install default-jdk -y

RUN npm install -g @angular/cli

RUN ls -lsa

CMD ["ng", "serve", "--host", "0.0.0.0"]