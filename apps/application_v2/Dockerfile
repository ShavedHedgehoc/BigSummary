FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache openssl python3 make g++
WORKDIR /app

RUN npm install -g pnpm@10

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY apps/application_v2/package.json ./apps/application_v2/
COPY packages/schemas/package.json ./packages/schemas/
COPY packages/trpc/package.json ./packages/trpc/

RUN pnpm install --frozen-lockfile

COPY apps/application_v2 ./apps/application_v2
COPY packages/schemas ./packages/schemas
COPY packages/trpc ./packages/trpc

ARG NODE_ENV=production
ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=\$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter @repo/application_v2 build

FROM node:20-alpine3.20 AS runtime
RUN apk add --no-cache curl openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/apps/application_v2/.next/standalone ./
COPY --from=builder /app/apps/application_v2/.next/static ./apps/application_v2/.next/static
COPY --from=builder /app/apps/application_v2/public ./apps/application_v2/public

# CMD PORT=${APP_PORT} node apps/application_v2/server.js
USER root

CMD PORT=${APP_PORT} HOSTNAME=0.0.0.0 node apps/application_v2/server.js