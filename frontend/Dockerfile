
FROM node:18-alpine

WORKDIR /frontend

COPY package*.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3001"]

EXPOSE 3001
