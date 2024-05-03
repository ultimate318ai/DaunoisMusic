FROM node:alpine

WORKDIR /usr/app

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install lib for python used in latex PDF compilation
RUN pip install -r ./latexCompiler/requirements.txt

RUN apk update \
    && apk add --no-cache \
    texlive-full \
    biber \
    latexmk

COPY ./ /usr/app

# Angular part
RUN npm install

RUN npm install -g @angular/cli

CMD ["ng", "serve", "--host", "0.0.0.0"]