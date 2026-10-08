# FROM node:20-alpine3.20 AS builder
# RUN apk add --no-cache openssl python3 make g++
# WORKDIR /app

# RUN npm install -g pnpm@10

# COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# COPY apps/workstation/package.json ./apps/workstation/
# COPY packages/schemas/package.json ./packages/schemas/
# COPY packages/trpc/package.json ./packages/trpc/

# RUN pnpm install --frozen-lockfile

# COPY apps/workstation ./apps/workstation
# COPY packages/schemas ./packages/schemas
# COPY packages/trpc ./packages/trpc

# RUN pnpm --filter @repo/workstation build

# FROM nginx:1.25-alpine AS runtime

# COPY --from=builder /app/apps/workstation/dist /usr/share/nginx/html

# CMD ["sh", "-c", "sed -i 's/listen       80;/listen       '\${WORKSTATION_PORT}';/g' /etc/nginx/conf.d/default.conf && sed -i '/location \\/ {/,/}/ s|index  index.html index.htm;|try_files uri uri/ /index.html;|' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

# Кэшируем зависимости монорепозитория
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/workstation/package.json ./apps/workstation/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/trpc/package.json ./packages/trpc/

RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY apps/workstation ./apps/workstation
COPY packages/schemas ./packages/schemas
COPY packages/trpc ./packages/trpc

# Собираем продакшн-билд фронтенда
RUN pnpm --filter @repo/workstation build

# ==========================================
# Финальный легковесный веб-сервер
# ==========================================
FROM nginx:1.25-alpine AS runtime

# ИСПРАВЛЕНО: Копируем СТРОГО содержимое папки dist в html-директорию Nginx.
# Никакие системные папки Alpine (/bin, /lib) при этом не пострадают.
COPY --from=builder /app/apps/workstation/dist /usr/share/nginx/html

# ИСПРАВЛЕНО: Избегаем конфликта кавычек JSON-массива. 
# Используем стандартную шелл-форму для Alpine.
CMD sed -i "s/listen       80;/listen       ${WORKSTATION_PORT};/g" /etc/nginx/conf.d/default.conf && \
    sed -i '/location \/ {/,/}/ s|index  index.html index.htm;|try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf && \
    exec nginx -g 'daemon off;'
