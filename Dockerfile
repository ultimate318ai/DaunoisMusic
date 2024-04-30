FROM node:alpine

WORKDIR /usr/app

# Install java default jdk and jre
RUN apk update && apk add openjdk17

COPY ./ /usr/app

# Antlr install
RUN apk --no-cache add curl
RUN curl -O http://www.antlr.org/download/antlr-4.7.1-complete.jar
RUN export CLASSPATH=".:/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH"
RUN alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
RUN alias grun='java org.antlr.v4.gui.TestRig'

RUN npm i antlr4 --save

# Antlr grammars file
RUN mkdir grammars
RUN curl --http1.1 https://github.com/antlr/grammars-v4/blob/master/ecmascript/ECMAScript.g4 --output grammars/ECMAScript.g4


# Angular part
RUN npm install

RUN npm install -g @angular/cli

CMD ["ng", "serve", "--host", "0.0.0.0"]