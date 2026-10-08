FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/workstation/package.json ./apps/workstation/

RUN pnpm install --frozen-lockfile

COPY apps/workstation ./apps/workstation
RUN pnpm --filter @repo/workstation build

FROM nginx:1.25-alpine AS runtime
COPY --from=builder /app/apps/workstation/dist /usr/share/nginx/html

CMD ["sh", "-c", "sed -i 's/listen 80;/listen '${WORKSTATION_PORT}';/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
