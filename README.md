# Sockets — Basta de medias medias

Sitio oficial de Sockets, una marca argentina de medias imantadas que se
mantienen juntas durante el lavado, el secado, el guardado y el traslado.

La web está construida como una pieza editorial de marca: incluye una intro
interactiva de primera visita, storytelling controlado por scroll, galería de
packaging, manifiesto y canales de compra/contacto.

## Stack

- Next.js 16 con App Router
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion para transiciones y microinteracciones
- GSAP + ScrollTrigger para el storytelling de scroll
- `next/image` para optimización de imágenes
- Fuentes locales desde paquetes Fontsource

## Desarrollo local

Requisitos:

- Node.js 20.9 o superior
- npm

Instalación y servidor de desarrollo:

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

Verificaciones:

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Contenido editable

Los textos, links, emails y redes están centralizados en:

```text
data/site-content.ts
```

Actualmente el CTA de compra abre Instagram. Cuando exista una tienda, cambiar
`purchaseUrl` en ese archivo.

Las rutas de imágenes están centralizadas en:

```text
lib/assets.ts
```

Los archivos reales viven en:

```text
public/assets/
```

Para reemplazar una imagen sin tocar componentes, conservar el nombre del
archivo actual. Si cambia el nombre, actualizar únicamente `lib/assets.ts`.

## Intro de primera visita

La intro guarda el estado en `localStorage` con la clave:

```text
sockets-intro-seen-v4
```

Para probarla nuevamente en desarrollo, borrar esa clave desde DevTools
(`Application > Local Storage`) o abrir una ventana privada.

En desktop se puede arrastrar la media; en touch, teclado o como fallback,
también se puede tocar/hacer clic para disparar el snap. La animación respeta
`prefers-reduced-motion`.

## Publicar en GitHub

El repositorio esperado es `nicoavayu/sockets_web`:

```bash
git add .
git commit -m "feat: build Sockets brand site"
git branch -M main
git remote add origin https://github.com/nicoavayu/sockets_web.git
git push -u origin main
```

Si `origin` ya existe, omitir el comando `git remote add`.

## Deploy en Vercel

1. Subir el proyecto a GitHub.
2. En Vercel, seleccionar **Add New > Project**.
3. Importar `nicoavayu/sockets_web`.
4. Mantener el preset **Next.js** y los comandos detectados por defecto.
5. Ejecutar **Deploy**.
6. En **Settings > Domains**, agregar `www.sockets.com.ar`.
7. Configurar en el proveedor DNS los registros que indique Vercel.

No se requieren variables de entorno para esta versión.

## Estructura principal

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  IntroMagnetLoader.tsx
  Header.tsx
  Hero.tsx
  MagneticSockScene.tsx
  ProblemSection.tsx
  HowItWorks.tsx
  Benefits.tsx
  ProductGallery.tsx
  ManifestoSection.tsx
  ContactSection.tsx
  Footer.tsx
data/
  site-content.ts
lib/
  assets.ts
public/
  assets/
```
