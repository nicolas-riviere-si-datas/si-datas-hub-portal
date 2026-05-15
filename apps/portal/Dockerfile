FROM node:20-alpine AS base
RUN npm install -g pnpm turbo

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune portal --docker

FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --no-frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/portal/node_modules ./apps/portal/node_modules
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter portal build

FROM base AS runner
WORKDIR /app/apps/portal
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/apps/portal/package.json ./package.json
COPY --from=builder /app/apps/portal/.next ./.next
COPY --from=builder /app/apps/portal/public* ./public/
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/apps/portal/node_modules ./node_modules
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
