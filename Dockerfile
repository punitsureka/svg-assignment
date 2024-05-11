FROM node:20-alpine as base
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start:prod" ]
