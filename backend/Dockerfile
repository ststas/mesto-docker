FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm ci --only=production --no-audit --prefer-offline

RUN npm install jsonwebtoken

COPY . .

CMD ["node", "app.js"]

EXPOSE 4000
