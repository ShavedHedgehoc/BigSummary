FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/workstation/package.json ./apps/workstation/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/trpc/package.json ./packages/trpc/

RUN pnpm install --frozen-lockfile

COPY apps/workstation ./apps/workstation
COPY packages/schemas ./packages/schemas
COPY packages/trpc ./packages/trpc

RUN pnpm --filter @repo/workstation build

FROM nginx:1.25-alpine AS runtime
RUN apk add --no-cache curl

COPY --from=builder /app/apps/workstation/dist /usr/share/nginx/html

RUN echo 'server { \
    listen ${WORKSTATION_PORT}; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.template

CMD ["sh", "-c", "envsubst '${WORKSTATION_PORT}' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
