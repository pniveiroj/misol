# Guía Paso a Paso: Subir Proyecto a GitHub y EasyPanel

## 📋 Requisitos Previos
- Tener Git instalado ✅ (Ya verificado)
- Tener cuenta en GitHub ✅ (Ya tienes el repositorio: https://github.com/pniveiroj/misol)
- Tener cuenta en EasyPanel

---

## 🔧 PASO 1: Configurar Git (si no lo has hecho antes)

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

**Nota:** Reemplaza con tu nombre y email reales.

---

## 📦 PASO 2: Inicializar Git y Añadir Archivos

Ya hemos inicializado Git. Ahora ejecuta estos comandos en la terminal:

```bash
# Añadir todos los archivos
git add .

# Verificar qué archivos se van a subir
git status

# Hacer el commit inicial
git commit -m "Initial commit: Autocares Mi-Sol website"
```

---

## 🔗 PASO 3: Conectar con el Repositorio de GitHub

Ejecuta estos comandos para conectar tu proyecto local con GitHub:

```bash
# Añadir el repositorio remoto
git remote add origin https://github.com/pniveiroj/misol.git

# Verificar que se añadió correctamente
git remote -v

# Cambiar a la rama main (si es necesario)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

**Nota:** Si te pide autenticación, usa un Personal Access Token de GitHub en lugar de tu contraseña.

---

## 🔑 PASO 4: Crear Personal Access Token en GitHub (si es necesario)

Si Git te pide autenticación:

1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click en "Generate new token (classic)"
3. Dale un nombre (ej: "EasyPanel Deploy")
4. Selecciona los permisos: `repo` (todos los permisos de repositorio)
5. Click en "Generate token"
6. **Copia el token** (solo se muestra una vez)
7. Úsalo como contraseña cuando Git te la pida

---

## 🚀 PASO 5: Configurar en EasyPanel

### 5.1. Acceder a EasyPanel
1. Inicia sesión en tu panel de EasyPanel
2. Ve a la sección de aplicaciones o proyectos

### 5.2. Crear Nueva Aplicación
1. Click en "Nueva Aplicación" o "Add Application"
2. Selecciona el tipo: **Node.js** o **Next.js**

### 5.3. Configurar la Aplicación
Completa los siguientes campos:

- **Nombre de la aplicación:** `autocares-misol` (o el que prefieras)
- **Repositorio Git:** `https://github.com/pniveiroj/misol`
- **Rama:** `main` (o `master` si usaste esa)
- **Framework:** `Next.js`
- **Node Version:** `18.x` o `20.x` (recomendado)

### 5.4. Variables de Entorno
Si tu aplicación necesita variables de entorno, añádelas en esta sección. Por ahora no necesitas ninguna.

### 5.5. Build Settings
EasyPanel debería detectar automáticamente que es Next.js, pero verifica:

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Install Command:** `npm install`

### 5.6. Puerto
- **Puerto:** `3000` (puerto por defecto de Next.js)

### 5.7. Dominio
- Configura tu dominio personalizado si lo tienes
- O usa el dominio proporcionado por EasyPanel

---

## ✅ PASO 6: Desplegar

1. Click en "Deploy" o "Desplegar"
2. EasyPanel comenzará a:
   - Clonar el repositorio
   - Instalar dependencias (`npm install`)
   - Construir la aplicación (`npm run build`)
   - Iniciar el servidor

3. Espera a que termine el proceso (puede tardar varios minutos)

---

## 🔍 PASO 7: Verificar el Despliegue

1. Una vez completado, verás la URL de tu aplicación
2. Haz click para abrirla en el navegador
3. Verifica que todo funciona correctamente

---

## 🐛 Solución de Problemas Comunes

### Error: "Repository not found"
- Verifica que el repositorio existe y es público, o que tienes acceso
- Verifica la URL del repositorio

### Error: "Build failed"
- Revisa los logs en EasyPanel
- Verifica que `package.json` tiene los scripts correctos:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
  ```

### Error: "Port already in use"
- Verifica que el puerto 3000 esté disponible
- O cambia el puerto en la configuración de EasyPanel

### La página no carga
- Verifica que el build se completó correctamente
- Revisa los logs de la aplicación en EasyPanel
- Verifica que todas las rutas están correctamente configuradas

---

## 📝 Notas Importantes

1. **Imágenes:** Las imágenes en `/public/images` se subirán con el código
2. **Variables de Entorno:** Si necesitas añadir variables más adelante, hazlo en EasyPanel
3. **Actualizaciones:** Cada vez que hagas `git push` a la rama main, EasyPanel puede desplegar automáticamente (si está configurado)
4. **Logs:** Siempre revisa los logs en EasyPanel si algo no funciona

---

## 🎉 ¡Listo!

Tu sitio web de Autocares Mi-Sol debería estar funcionando en EasyPanel.

Si tienes algún problema, revisa los logs en EasyPanel o contacta con su soporte.


