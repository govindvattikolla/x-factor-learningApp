FROM node:latest
LABEL authors="ndatt"

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start","dev"]