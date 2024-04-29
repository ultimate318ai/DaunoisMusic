FROM node:latest


# Install java default jdk and jre
RUN apt-get update && apt-get install default-jre -y \
&& apt-get install default-jdk -y

CMD ["java", "-version"]