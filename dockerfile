# ==========================
# Stage 1 - Build Frontend
# ==========================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY Frontend/package*.json ./

RUN npm ci

COPY Frontend/ .

RUN npm run build


# ==========================
# Stage 2 - Build Backend
# ==========================
FROM node:20-alpine AS backend-builder

WORKDIR /app

COPY Backend/package*.json ./

RUN npm ci

COPY Backend/ .

RUN npm run build


# ==========================
# Stage 3 - Production
# ==========================
FROM node:20-alpine

WORKDIR /app

COPY Backend/package*.json ./

RUN npm ci --omit=dev

COPY --from=backend-builder /app/dist ./dist

COPY --from=frontend-builder /app/dist ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]