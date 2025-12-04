# Panel de Administración - Autocares Mi-Sol

## 🚀 Configuración Inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar base de datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Crear base de datos y migraciones
npx prisma migrate dev --name init

# Migrar contenido existente (JSON) a la base de datos
npm run db:seed
```

### 3. Crear archivo .env
Copia `.env.example` a `.env` y ajusta las variables si es necesario:
```bash
cp .env.example .env
```

## 🔐 Acceso al Panel de Administración

**URL:** `/admin/login`

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin`

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer acceso en producción.

## 📋 Funcionalidades

### Gestión de Contenido
- Editar todos los textos de la web
- Gestionar traducciones (Español, Valenciano, Inglés)
- Búsqueda de contenido por clave o texto
- Guardado automático al editar

### Gestión de Imágenes
- Subir nuevas imágenes
- Organizar por categorías
- Eliminar imágenes
- Vista previa de imágenes

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Generar cliente Prisma
npm run db:generate

# Crear nueva migración
npm run db:migrate

# Migrar contenido
npm run db:seed

# Producción
npm run build
npm start
```

## 📁 Estructura del Backend

```
app/
  api/
    admin/
      auth/          # Login, logout, verificación
      content/        # CRUD de traducciones
      images/         # Gestión de imágenes
    content/
      translations/   # API pública de traducciones
  admin/
    login/           # Página de login
    dashboard/       # Panel principal
    content/         # Editor de contenido
    images/          # Gestor de imágenes

lib/
  prisma.ts          # Cliente Prisma
  auth.ts            # Funciones de autenticación
  get-translations.ts # Lee de BD con fallback a JSON

prisma/
  schema.prisma      # Schema de la base de datos

scripts/
  migrate-content.ts # Script de migración inicial
```

## 🔒 Seguridad

- Las rutas `/admin/*` requieren autenticación
- Las contraseñas se almacenan hasheadas con bcrypt
- Las sesiones se gestionan mediante cookies httpOnly
- Las API routes de admin verifican autenticación

## 📝 Notas

- El sistema lee primero de la base de datos
- Si la BD no está disponible, usa los JSON como fallback
- Los cambios se guardan inmediatamente al editar
- Las imágenes se almacenan en `public/images/jpg/`

