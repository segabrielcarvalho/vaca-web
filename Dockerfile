FROM node:22.17.1-alpine AS base

RUN apk add --no-cache openssl
RUN apk add --no-cache libc6-compat

RUN npm install -g pnpm

WORKDIR /app

FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_GRAPHQL_URL
ARG NEXT_PUBLIC_API_WS_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_GRAPHQL_URL=${NEXT_PUBLIC_API_GRAPHQL_URL}
ENV NEXT_PUBLIC_API_WS_URL=${NEXT_PUBLIC_API_WS_URL}

RUN pnpm build
RUN pnpm prune --prod

FROM base AS runtime

WORKDIR /app

COPY --from=deps  /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

RUN chmod -R u+w /app/node_modules/.pnpm

EXPOSE 5003

CMD ["pnpm", "start"]

FROM runtime AS production

ENV NODE_ENV=production
ENV PORT=5003

FROM runtime AS staging

ENV NODE_ENV=staging
ENV PORT=5003

FROM base AS development

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN chmod +x /app/start.sh

EXPOSE 5003

CMD ["/bin/sh", "/app/start.sh"]
