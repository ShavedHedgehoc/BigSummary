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

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY apps/api_v2 ./apps/api_v2
COPY packages/db/postgres ./packages/db/postgres
COPY packages/db/mssql ./packages/db/mssql
COPY packages/schemas ./packages/schemas

# 1. Генерируем Prisma Client во внутренних пакетах
RUN pnpm --filter @repo/db-postgres generate
RUN pnpm --filter @repo/db-mssql generate

# 2. Собираем приложение NestJS (создает папку dist)
RUN pnpm --filter @repo/api_v2 build

# 3. Изолируем приложение и его prod-зависимости в папку /app/isolated
RUN pnpm --filter @repo/api_v2 --prod deploy /app/isolated

# 4. Копируем скомпилированные файлы внутрь изолированной папки
RUN cp -r apps/api_v2/dist /app/isolated/dist

# 5. Копируем сгенерированный клиент Prisma для Postgres
RUN mkdir -p /app/isolated/node_modules/@repo/db-postgres/node_modules/@prisma/client && \
    cp -r packages/db/postgres/node_modules/@prisma/client/* /app/isolated/node_modules/@repo/db-postgres/node_modules/@prisma/client/

# ИСПРАВЛЕНО: Копируем сгенерированный клиент Prisma для MSSQL
RUN mkdir -p /app/isolated/node_modules/@repo/db-mssql/node_modules/@prisma/client && \
    cp -r packages/db/mssql/node_modules/@prisma/client/* /app/isolated/node_modules/@repo/db-mssql/node_modules/@prisma/client/

# 6. Копируем схему Prisma для Postgres напрямую в изолированную папку (для миграций при старте)
RUN cp packages/db/postgres/prisma/schema.prisma /app/isolated/schema.prisma

# 7. Копируем бинарник Prisma CLI из слоя сборщика
RUN cp -r node_modules/prisma /app/isolated/node_modules/prisma

# ==========================================
FROM node:20-alpine3.20 AS runtime
RUN apk add --no-cache openssl
WORKDIR /app

# Копируем готовую автономную папку isolated
COPY --from=builder /app/isolated ./

# Запуск миграций для Postgres, а затем старт API.
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy --schema=./schema.prisma && node dist/main"]
