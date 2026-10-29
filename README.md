# Ryzon — web corporativa

Monorepo con **Turborepo + pnpm**. La app usa **Next.js (App Router) con Turbopack**, React 19, GSAP + ScrollTrigger.

```bash
pnpm install
pnpm dev        # turbo → next dev --turbopack  (http://localhost:3000)
pnpm build      # turbo → next build --turbopack
pnpm typecheck
```

## Estructura

```
packages/
  tokens/   Sistema de diseño: variables CSS (tokens.css) y tokens para código (colores, breakpoints, movimiento)
  ui/       Átomos y moléculas (Button, Heading, SplitText, Mono, Text, Input…, Field, FigureFrame, ChannelList…)
apps/web/src/
  data/     DATOS: copy en español, servicios, principios, geometría del diagrama. Sin React ni lógica.
  logic/    LÓGICA: hooks, motores (red de nodos, condensación, proyección isométrica, timelines GSAP),
            validación y servicios (envío del formulario). Sin JSX.
  view/     VISTA: secciones y layout. Solo componen átomos/moléculas y consumen data + hooks.
  app/      Rutas de Next (layout y page como plantilla).
```

Flujo: `data` → `view` (renderiza) ← `logic` (anima y reacciona). Los `data-*` de la vista son el contrato con los motores.

## Pendientes (datos no confirmados)

Contenido en `apps/web/src/data/site.ts` con espacios reservados `[correo de contacto]`, `[teléfono]`, `[ciudad]`, `[horario]`, `[razón social]`.
Logo: `packages/ui/src/atoms/Logo.tsx` (favicon en `apps/web/src/app/icon.svg`). Envío del formulario: `apps/web/src/logic/services/contactService.ts`.

## Créditos

Modelo 3D «Server V2 +console» de [FlevasGR](https://sketchfab.com/FlevasGR), licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (`apps/web/public/models/server-rack.glb`).
Está adaptado: el gabinete se reemplaza por un material liso para quitar la marca original (`apps/web/src/logic/engines/rackModel.ts`). El crédito se muestra en la esquina del diagrama 3D de Servicios (`ModelCredit`).
