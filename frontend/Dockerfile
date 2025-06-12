# Stage 1: Build application
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Копируем только файлы, необходимые для установки зависимостей
COPY package.json package-lock.json ./

# 2. Устанавливаем зависимости с очисткой кеша
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

# 3. Копируем остальные файлы
COPY . .

# 4. Сборка приложения с production-флагами
RUN npm run build && \
    rm -rf node_modules  # Удаляем ненужные зависимости после сборки

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# 5. Устанавливаем только production-зависимости
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

# 6. Копируем только необходимые артефакты сборки
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 7. Production-переменные
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# 8. Оптимизации безопасности
RUN apk add --no-cache dumb-init && \
    chown -R node:node /app

USER node

EXPOSE 3000

# 9. Используем встроенный Next.js сервер (не нужен serve)
CMD ["dumb-init", "npx", "serve", "-p", "3000", "-s", "out"]