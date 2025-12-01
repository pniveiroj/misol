# 📋 Instrucciones de Instalación - Autocares Mi-Sol

## ⚠️ Problema Detectado

Si ves el error "ERR_CONNECTION_REFUSED" en localhost:3000, significa que el servidor no está ejecutándose.

## 🔧 Solución Paso a Paso

### 1. Abrir Terminal/CMD en la carpeta del proyecto

Asegúrate de estar en la carpeta:
```
D:\pablo\AGENCIA IA\PROYECTOS WEB\AUTOBUSES
```

### 2. Instalar Dependencias

Ejecuta este comando (puede tardar unos minutos):

```bash
npm install
```

**Si tienes problemas con npm, prueba con:**
```bash
npm install --legacy-peer-deps
```

### 3. Verificar Instalación

Después de instalar, deberías ver una carpeta `node_modules` creada.

### 4. Iniciar Servidor de Desarrollo

Una vez instaladas las dependencias, ejecuta:

```bash
npm run dev
```

Deberías ver algo como:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

### 5. Abrir en el Navegador

Abre tu navegador y ve a:
```
http://localhost:3000
```

## 🐛 Solución de Problemas

### Error: "npm no se reconoce como comando"
- Instala Node.js desde: https://nodejs.org/
- Asegúrate de instalar la versión LTS (18 o superior)
- Reinicia tu terminal después de instalar

### Error: "Cannot find module"
- Elimina la carpeta `node_modules` si existe
- Elimina el archivo `package-lock.json` si existe
- Ejecuta `npm install` de nuevo

### Puerto 3000 ya está en uso
- Cierra otras aplicaciones que usen el puerto 3000
- O cambia el puerto en `package.json`:
  ```json
  "dev": "next dev -p 3001"
  ```

### Error de permisos
- Ejecuta la terminal como administrador
- O instala las dependencias globalmente con permisos

## ✅ Verificación

Si todo funciona correctamente, deberías ver:
- ✅ La página de inicio con el hero section
- ✅ Navegación funcionando
- ✅ Sin errores en la consola del navegador
- ✅ Sin errores en la terminal

## 📞 Siguiente Paso

Una vez que el servidor esté funcionando, podrás:
1. Ver el sitio en http://localhost:3000
2. Hacer cambios y verlos en tiempo real
3. Navegar por todas las páginas

---

**¿Necesitas ayuda?** Verifica que:
- Node.js está instalado: `node --version`
- npm está instalado: `npm --version`
- Estás en la carpeta correcta del proyecto

