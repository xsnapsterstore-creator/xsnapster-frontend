# 1. Use official Node.js image
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (improves caching)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# 4. Install dependencies
RUN npm install

# 5. Copy all project files
COPY . .

# 6. Build Next.js app
RUN npm run build

# -------------------------------------------------------------
# Production image
# -------------------------------------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 7. Copy only required production files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 8. Expose port
EXPOSE 3000

# 9. Run Next.js in production mode
CMD ["npm", "start"]
