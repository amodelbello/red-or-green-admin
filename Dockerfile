FROM node:8
EXPOSE 8080
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV VUE_APP_API_HOST http://localhost:3001
CMD ["npm", "run", "serve"]