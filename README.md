# Akali Piercing

Sitio del estudio (React + TypeScript + Vite) con un panel de administración sobre Firebase.

## Uso

```bash
cp .env.example .env   # completar con los valores de Firebase
npm install
npm run dev            # desarrollo
npm run build          # producción (dist/)
npm run lint
```

## Estructura

Arquitectura por capas; el sitio público funciona solo con datos mock (sin backend).

- `src/types`, `src/domain`: modelos y reglas puras (sin React ni I/O).
- `src/data`: contenido estático y `data/mock` (catálogo de prueba).
- `src/repositories`: puerto `catalogRepository` (mock por defecto; `VITE_DATA_SOURCE=firebase` usa Firestore).
- `src/hooks`, `src/lib`: casos de uso, utilidades y validación (zod).
- `src/styles`: sistema de diseño global (tokens, base, layout, components, sections). No hay estilos por página.
- `src/components`: piezas reutilizables (`ui`, `form`, `motion`, `deco`, `layout`, `catalog`).
- `src/sections`: secciones de cada página; `src/pages` solo las compone.
- `src/components/admin`, `src/pages/Admin`: panel de administración sobre Firebase (sin cambios).

Reglas: estilos globales, un solo componente por patrón (Button, TextField, Modal…), ningún archivo de más de 250 líneas.

El panel sólo oculta la interfaz a quien no es admin: la protección real de los datos está en las reglas de Firestore.
