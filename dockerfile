FROM node:20
COPY src ./app/src
COPY package.json package-lock.json ./app/
WORKDIR /app
RUN npm i
RUN ls -al
ENTRYPOINT npm run start