# Guía de Deployment

## 🚀 Opciones de Deployment

### Vercel (Recomendado)

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **O conectar con GitHub:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio
   - Vercel detectará Next.js automáticamente
   - Configura las variables de entorno si es necesario

### Netlify

1. **Instalar Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Build command:**
```bash
npm run build
```

3. **Publish directory:**
```
.next
```

4. **Deploy:**
```bash
netlify deploy --prod
```

### Docker

Crear `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## 📝 Variables de Entorno

Configurar en el panel de tu hosting:

- `NODE_ENV=production`
- Variables de email (si usas SendGrid)
- Google Maps API Key (si lo implementas)
- Google Analytics ID (si lo implementas)

## 🔧 Optimizaciones Pre-Deploy

1. **Verificar build:**
```bash
npm run build
```

2. **Verificar lint:**
```bash
npm run lint
```

3. **Optimizar imágenes:**
   - Usar formato WebP/AVIF
   - Comprimir imágenes antes de subirlas
   - Usar next/image para optimización automática

## 📊 Post-Deploy

1. Verificar que todas las rutas funcionen
2. Probar formularios de contacto
3. Verificar SEO (meta tags, sitemap)
4. Configurar dominio personalizado
5. Configurar SSL/HTTPS


