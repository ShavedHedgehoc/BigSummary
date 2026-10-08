FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY apps/api_v2/package.json ./apps/api_v2/
COPY packages/db/postgres/package.json ./packages/db/postgres/
COPY packages/db/mssql/package.json ./packages/db/mssql/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/trpc/package.json ./packages/trpc/

RUN pnpm install --frozen-lockfile

COPY apps/api_v2 ./apps/api_v2
COPY packages/db/postgres ./packages/db/postgres
COPY packages/db/mssql ./packages/db/mssql
COPY packages/schemas ./packages/schemas
COPY packages/trpc ./packages/trpc

RUN pnpm --filter @repo/db-postgres generate
RUN pnpm --filter @repo/db-mssql generate

RUN pnpm --filter @repo/api_v2 build

RUN pnpm --filter @repo/api_v2 --prod deploy /app/isolated --legacy


RUN cp -r apps/api_v2/dist /app/isolated/dist

RUN mkdir -p /app/isolated/node_modules/@repo/db-postgres/src/generated && \
    cp -r packages/db/postgres/src/generated/* /app/isolated/node_modules/@repo/db-postgres/src/generated/
# RUN mkdir -p /app/isolated/node_modules/@repo/db-postgres/src/generated && \
#     cp -r packages/db/postgres/src/generated/* /app/isolated/node_modules/@repo/db-postgres/src/generated/

FROM node:20-alpine3.20 AS runtime
RUN apk add --no-cache openssl
WORKDIR /app


COPY --from=builder /app/isolated ./

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./node_modules/@repo/db-postgres/prisma/schema.prisma && npx tsx dist/main.js"]
