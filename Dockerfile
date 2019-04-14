FROM node:8
EXPOSE 8080
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
CMD ["npm", "run", "serve"]