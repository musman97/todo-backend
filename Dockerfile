FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml /app/

RUN corepack enable pnpm && corepack use pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]