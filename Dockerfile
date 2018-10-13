FROM node:8
EXPOSE 8080
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN rm -r node_modules && npm install && npm cache clean --force
CMD ["npm", "run", "serve"]