FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm audit fix --force

COPY . .

EXPOSE 8901

CMD ["npm",'run','start']