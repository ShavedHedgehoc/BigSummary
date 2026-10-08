# FROM node:20-alpine3.20 AS builder
# RUN apk add --no-cache openssl python3 make g++
# WORKDIR /app

# RUN npm install -g pnpm@10


# COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# COPY apps/api_v2/package.json ./apps/api_v2/
# COPY packages/db/postgres/package.json ./packages/db/postgres/
# COPY packages/db/mssql/package.json ./packages/db/mssql/
# COPY packages/schemas/package.json ./packages/schemas/
# COPY packages/trpc/package.json ./packages/trpc/

# RUN pnpm install --frozen-lockfile

# COPY apps/api_v2 ./apps/api_v2
# COPY packages/db/postgres ./packages/db/postgres
# COPY packages/db/mssql ./packages/db/mssql
# COPY packages/schemas ./packages/schemas
# COPY packages/trpc ./packages/trpc

# RUN pnpm --filter @repo/db-postgres generate
# RUN pnpm --filter @repo/db-mssql generate

# RUN pnpm --filter @repo/api_v2 build

# RUN pnpm --filter @repo/api_v2 --prod deploy /app/isolated --legacy

# RUN cp -r apps/api_v2/dist /app/isolated/dist

# RUN mkdir -p /app/isolated/node_modules/@repo/db-postgres/src/generated && \
#     cp -r packages/db/postgres/src/generated/* /app/isolated/node_modules/@repo/db-postgres/src/generated/
# RUN mkdir -p /app/isolated/node_modules/@repo/db-mssql/src/generated && \
#     cp -r packages/db/mssql/src/generated/* /app/isolated/node_modules/@repo/db-mssql/src/generated/

# RUN mkdir -p /app/isolated/node_modules/@repo/db-postgres/prisma && \
#     cp -r packages/db/postgres/prisma/* /app/isolated/node_modules/@repo/db-postgres/prisma/

# RUN cp -r node_modules/prisma /app/isolated/node_modules/prisma && \
#     cp -r node_modules/tsx /app/isolated/node_modules/tsx

# FROM node:20-alpine3.20 AS runtime
# RUN apk add --no-cache openssl
# WORKDIR /app

# COPY --from=builder /app/isolated ./

# CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy --schema=./node_modules/@repo/db-postgres/prisma/schema.prisma && node node_modules/tsx/dist/cli.mjs dist/main"]

# FROM node:20-alpine3.20 AS builder
# RUN apk add --no-cache openssl python3 make g++
# WORKDIR /app

# RUN npm install -g pnpm@10

# # Копируем конфиги монорепозитория
# COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# # Копируем package.json для кэширования зависимостей
# COPY apps/api_v2/package.json ./apps/api_v2/
# COPY packages/db/postgres/package.json ./packages/db/postgres/
# COPY packages/db/mssql/package.json ./packages/db/mssql/
# COPY packages/schemas/package.json ./packages/schemas/
# COPY packages/trpc/package.json ./packages/trpc/

# # Устанавливаем зависимости
# RUN pnpm install --frozen-lockfile

# # Копируем исходный код пакетов
# COPY apps/api_v2 ./apps/api_v2
# COPY packages/db/postgres ./packages/db/postgres
# COPY packages/db/mssql ./packages/db/mssql
# COPY packages/schemas ./packages/schemas
# COPY packages/trpc ./packages/trpc

# # 1. Генерируем Prisma Client во внутренних пакетах
# RUN pnpm --filter @repo/db-postgres generate
# RUN pnpm --filter @repo/db-mssql generate

# # 2. Собираем приложение NestJS (создает папку dist)
# RUN pnpm --filter @repo/api_v2 build

# # 3. Изолируем приложение и его prod-зависимости с помощью pnpm deploy
# RUN pnpm --filter @repo/api_v2 --prod deploy /app/isolated --legacy

# # 4. Копируем скомпилированную папку dist в isolated
# RUN cp -r apps/api_v2/dist /app/isolated/dist

# # # 6. Копируем бинарники CLI Prisma и TSX для запуска в рантайме
# # RUN cp -r node_modules/prisma /app/isolated/node_modules/prisma && \
# #     cp -r node_modules/tsx /app/isolated/node_modules/tsx

# # ==========================================
# FROM node:20-alpine3.20 AS runtime
# RUN apk add --no-cache openssl
# WORKDIR /app

# # Копируем чистую автономную папку isolated
# COPY --from=builder /app/isolated ./

# # Сначала запускаем миграции по прямой схеме, а затем стартуем API через локальный tsx
# # CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy --schema=./node_modules/@repo/db-postgres/prisma/schema.prisma && node node_modules/tsx/dist/cli.mjs dist/main"]
# CMD ["sh", "-c", "npx prisma migrate deploy --schema=./node_modules/@repo/db-postgres/prisma/schema.prisma && npx tsx dist/main"]
FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

# Копируем конфиги монорепозитория
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Копируем package.json для кэширования зависимостей
COPY apps/api_v2/package.json ./apps/api_v2/
COPY packages/db/postgres/package.json ./packages/db/postgres/
COPY packages/db/mssql/package.json ./packages/db/mssql/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/trpc/package.json ./packages/trpc/

# Устанавливаем все зависимости (включая dev для сборки)
RUN pnpm install --frozen-lockfile

# Копируем исходный код пакетов
COPY apps/api_v2 ./apps/api_v2
COPY packages/db/postgres ./packages/db/postgres
COPY packages/db/mssql ./packages/db/mssql
COPY packages/schemas ./packages/schemas
COPY packages/trpc ./packages/trpc

# 1. Генерируем Prisma Client во внутренних пакетах
RUN pnpm --filter @repo/db-postgres generate
RUN pnpm --filter @repo/db-mssql generate

# 2. Собираем NestJS приложение (создает папку dist)
RUN pnpm --filter @repo/api_v2 build

# 3. ИСПРАВЛЕНО: Вместо капризного deploy удаляем devDependencies прямо в корне.
# Это очистит node_modules от мусора сборки, сохранив рабочие внутренние линки.
RUN pnpm prune --prod

# ==========================================
FROM node:20-alpine3.20 AS runtime
RUN apk add --no-cache openssl
WORKDIR /app

# Копируем всё собранное и очищенное содержимое корня /app в финальный образ
COPY --from=builder /app ./

# Путь к схеме теперь простой и прямой, так как структура монорепозитория сохранена в корне
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./packages/db/postgres/prisma/schema.prisma && npx tsx apps/api_v2/dist/main.ts"]
