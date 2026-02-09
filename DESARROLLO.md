# Guía de Desarrollo - MovieFlix

## Primeros Pasos

### 1. Instalación
```bash
npm install
npm run dev
```
La app estará en `http://localhost:5173`

### 2. Estructura del Proyecto
- `/src/components` - Componentes UI (atoms, molecules, organisms)
- `/src/pages` - Páginas/rutas (HomePage, SearchPage, MovieDetailPage)
- `/src/services` - API simulada (movieService.ts)
- `/src/types` - Tipos TypeScript
- `/src/router` - Rutas y loaders

## Agregar Nueva Película

En `src/services/mockMovies.ts`, agregar objeto a `mockMovies[]`:

```typescript
{
  id: 9,  // ID único
  title: 'Nueva Película',
  description: 'Descripción aquí',
  poster: 'URL imagen póster',
  backdrop: 'URL imagen fondo',
  releaseDate: '2024-01-15',
  rating: 8.5,
  genre: ['Drama', 'Action'],
  duration: 120,
  director: 'Director Name',
  cast: ['Actor 1', 'Actor 2'],
}
```

## Agregar Nuevo Componente Atómico

1. Crear archivo en `src/components/atoms/MiComponente.tsx`
2. Agregar a `src/components/atoms/index.ts`:
   ```typescript
   export { default as MiComponente } from './MiComponente'
   ```
3. Importar: `import { MiComponente } from '@components/atoms'`

## Modificar API Mock

El servicio esta en `src/services/movieService.ts`.

### Agregar nuevo método:
```typescript
export const movieService = {
  // ... métodos existentes

  miNuevaFuncion: async (param: string): Promise<Movie[]> => {
    await delay(500)
    // lógica aquí
    return mockMovies.filter(...)
  },
}
```

### Usar en componente:
```typescript
import { movieService } from '@services/movieService'

const movies = await movieService.miNuevaFuncion('busqueda')
```

## Agregar Nueva Ruta

1. Crear página en `src/pages/MiPaginaPage.tsx`
2. Si necesita datos, crear loader en `src/router/loaders.ts`
3. Agregar ruta en `src/router/index.ts`:

```typescript
{
  path: '/mi-ruta/:id',
  element: <MiPaginaPage />,
  loader: miLoader,  // opcional
},
```

## Estilos y Tailwind

- **NO usar CSS externo** - Todo con Tailwind utilities
- **Colores**: `bg-primary`, `text-primary`, `border-primary`
- **Grid responsivo**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Hover effects**: `hover:bg-red-700`, `hover:scale-110 transition-transform`

## TypeScript

Los tipos están definidos en `src/types/movie.ts`.

Cuando crees interfaces nuevas:
```typescript
// src/types/miTipo.ts
export interface MiTipo {
  prop1: string
  prop2: number
}
```

## Naming Conventions

### Componentes
- `MyComponent.tsx` (PascalCase)
- `export default function MyComponent()`

### Funciones
- `myFunction()` (camelCase)
- `const my Function = async () => {}`

### Clases CSS (si es necesario)
- `.mycomponent--container` (BEM)
- `.mycomponent__element`
- `.mycomponent__element--modifier`

## Debugging

### Ver todos los datos mock:
```typescript
import { mockMovies } from '@services/mockMovies'
console.log(mockMovies)
```

### Simular retardo de red:
Los servicios ya tienen `await delay(500)` integrado para simular AJAX.

### React DevTools
Instalar extensión "React Developer Tools" en Chrome/Firefox para inspeccionar componentes.

## Build para Producción

```bash
npm run build   # Genera carpeta 'dist/'
npm run preview # Verifica el build localmente
```

Desplegar contenido de `dist/` en:
- Vercel
- GitHub Pages
- Netlify
- Cualquier servidor web

## Posibles Mejoras Futuras

1. **Agregar persistencia**:
   - LocalStorage para favoritos
   - IndexedDB para caché de datos

2. **Autenticación**:
   - Login de usuario
   - Historial personal

3. **API Real**:
   - Integrar TMDB API
   - Integrar OMDb API

4. **Características**:
   - Sistema de calificaciones
   - Comentarios
   - Listas personalizadas
   - Compartir películas

5. **Performance**:
   - Lazy loading de imágenes
   - Code splitting
   - PWA (Progressive Web App)

## Troubleshooting

### "Module not found"
- Verificar paths en `tsconfig.json`
- Verificar ruta aliases en `vite.config.ts`

### "Component not rendering"
- Verificar React Router setup en `src/router/index.ts`
- Verificar `<Outlet />` en MainLayout

### "Styles not applying"
- Verificar clase Tailwind existe
- `npm install` y reiniciar dev server si es necesario
- Verificar `tailwind.config.js` content paths

## Recursos Útiles

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
