FROM node:14.17-alpine    
WORKDIR /urs/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD ["npm", "start"]