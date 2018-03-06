FROM node:alpine
RUN adduser -S server
USER server
WORKDIR /home/server
ADD . .
RUN npm install --production
EXPOSE 3000
VOLUME /home/server/.kube
CMD node app.js