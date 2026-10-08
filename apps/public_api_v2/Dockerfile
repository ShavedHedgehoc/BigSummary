FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

# Копируем конфиги монорепозитория
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Копируем package.json для кэширования зависимостей
COPY apps/public_api_v2/package.json ./apps/public_api_v2/
COPY packages/db/postgres/package.json ./packages/db/postgres/
COPY packages/schemas/package.json ./packages/schemas/

RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY apps/public_api_v2 ./apps/public_api_v2
COPY packages/db/postgres ./packages/db/postgres
COPY packages/schemas ./packages/schemas

# 1. Генерируем Prisma Client во внутреннем пакете
RUN pnpm --filter @repo/db-postgres generate

# 2. Собираем приложение NestJS (создает папку dist)
RUN pnpm --filter @repo/public_api_v2 build

# 3. Изолируем приложение и его prod-зависимости в папку /app/isolated
RUN pnpm --filter @repo/public_api_v2 --prod deploy /app/isolated --legacy

# 4. Копируем скомпилированные файлы внутрь изолированной папки
RUN cp -r apps/public_api_v2/dist /app/isolated/dist

# 5. Копируем сгенерированный клиент Prisma в node_modules локального пакета БД внутри isolated
RUN mkdir -p /app/isolated/node_modules/@repo/db-postgres/src/generated && \
    cp -r packages/db/postgres/src/generated/* /app/isolated/node_modules/@repo/db-postgres/src/generated/
    
# ==========================================
FROM node:20-alpine3.20 AS runtime
RUN apk add --no-cache openssl
WORKDIR /app

# Копируем готовую автономную папку isolated
COPY --from=builder /app/isolated ./

CMD ["npx", "tsx", "dist/main"]