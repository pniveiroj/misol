# Optimización de Imágenes - Autocares Mi-Sol

## ⚠️ Problema Detectado

La imagen `1.png` pesa **2.5 MB**, lo cual es demasiado para una imagen web y causa lentitud en la carga.

## ✅ Optimizaciones Aplicadas

1. **Añadido `loading="lazy"`** a todas las imágenes no críticas:
   - Imágenes de secciones (Services, About, Fleet, News, CTA)
   - Imágenes de contenido en páginas
   - Imágenes de fondo con baja opacidad

2. **Mantenido `priority`** en imágenes críticas:
   - Hero section (imagen principal)
   - Hero sections de páginas principales

3. **Configuración de Next.js mejorada**:
   - Tamaños de dispositivo optimizados
   - Formatos modernos (AVIF, WebP) habilitados

## 🔧 Recomendación Importante

**La imagen `1.png` debe optimizarse:**

### Opción 1: Usar herramienta online
1. Ve a https://tinypng.com/ o https://squoosh.app/
2. Sube `public/images/jpg/1.png`
3. Descarga la versión optimizada
4. Reemplaza el archivo original

### Opción 2: Convertir a JPG
1. Abre `1.png` en un editor de imágenes
2. Conviértela a JPG con calidad 80-85%
3. Guárdala como `1.jpg` en `public/images/jpg/`
4. Actualiza la referencia en el código

### Opción 3: Usar herramienta de línea de comandos
```bash
# Si tienes ImageMagick instalado
magick convert public/images/jpg/1.png -quality 85 public/images/jpg/1.jpg
```

## 📊 Tamaños Actuales de Imágenes

- `1.png`: **2.5 MB** ⚠️ (DEMASIADO PESADA - optimizar)
- `2.jpg`: 0.35 MB ✅
- `3.jpg`: 0.25 MB ✅
- `4.jpg`: 0.30 MB ✅
- `5.jpg`: 0.19 MB ✅
- `6.jpg`: 0.39 MB ✅
- `7.jpg`: 0.39 MB ✅
- `8.jpg`: 0.46 MB ✅
- `9.jpg`: 0.22 MB ✅
- `escolar.jpg`: 0.48 MB ✅

## 🎯 Objetivo

Todas las imágenes deberían pesar menos de **500 KB** (0.5 MB) para una carga rápida.

## 📝 Notas

- Las imágenes con `priority` se cargan inmediatamente (Hero sections)
- Las imágenes con `loading="lazy"` se cargan cuando el usuario hace scroll
- Next.js optimiza automáticamente las imágenes en producción
- Los formatos AVIF y WebP se generan automáticamente para mejor compresión

