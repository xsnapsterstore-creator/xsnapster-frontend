# ---------------- BUILDER STAGE ----------------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install dependencies (clean & reproducible)
    COPY package.json package-lock.json ./
    RUN npm ci
    
    # Copy project files
    COPY . .
    
    # Disable telemetry (optional)
    ENV NEXT_TELEMETRY_DISABLED=1
    
    # Build app
    RUN npm run build
    
    
    # ---------------- RUNNER STAGE ----------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    # Copy only required files
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/package-lock.json ./
    
    # Install ONLY production dependencies
    RUN npm ci --omit=dev
    
    # Copy build output
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.mjs ./
    
    EXPOSE 3000
    
    CMD ["npm", "start"]