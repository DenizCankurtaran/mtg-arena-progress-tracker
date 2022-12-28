FROM node:19-alpine3.16

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["node", "./svelte-kit/build"]