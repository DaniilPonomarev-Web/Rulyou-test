FROM node:22.2.0-alpine AS base

FROM base AS builder
WORKDIR /app

COPY --from=crud-image:deps /app/node_modules ./node_modules
COPY . .

RUN yarn nest build 

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/dist/ .
COPY --from=builder /app/ormconfig.js .

WORKDIR /app

COPY --from=crud-image:deps /app/node_modules ./node_modules

CMD ["node", "main.js"]