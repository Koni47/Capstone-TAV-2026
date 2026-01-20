# Stage 1: Building the code
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias en builder (usar install para evitar errores por lockfile desactualizado)
RUN npm install --legacy-peer-deps

COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Build de la aplicación
RUN npm run build

# Stage 2: Development (para docker-compose con volúmenes)
FROM node:20-alpine AS development
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma
COPY . .
CMD ["npm", "run", "start:dev"]

# Stage 3: Production
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Usuario no root para seguridad
USER node

EXPOSE 3000

CMD ["node", "dist/main"]
