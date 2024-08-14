FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm ci --force

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "dev"]