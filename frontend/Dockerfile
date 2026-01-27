FROM node:18-alpine AS builder
WORKDIR /app

# Instala dependencias (intenta ci, si falla usa install)
COPY package.json package-lock.json* ./
# Use npm ci when a lockfile exists, otherwise fall back to npm install
RUN if [ -f package-lock.json ]; then \
			npm ci --legacy-peer-deps; \
		else \
			npm install --legacy-peer-deps; \
		fi

# Copia el resto del proyecto y construye
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
