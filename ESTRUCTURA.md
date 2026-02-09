# Estructura del Proyecto MovieFlix

## 📁 Árbol de Carpetas

```
movieflix/
├── index.html                    # Archivo HTML principal
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración TypeScript
├── tsconfig.node.json            # TS Config para Vite
├── vite.config.ts                # Configuración Vite
├── tailwind.config.js            # Configuración Tailwind CSS
├── postcss.config.js             # Configuración PostCSS
├── .gitignore                    # Archivos a ignorar en Git
├── .env.example                  # Variables de entorno ejemplo
├── .prettierrc                   # Configuración Prettier
├── .eslintrc                     # Configuración ESLint
├── README.md                     # Documentación principal
│
└── src/
    ├── main.tsx                  # Punto de entrada
    ├── App.tsx                   # Componente raíz
    ├── index.css                 # Estilos globales (Tailwind)
    │
    ├── router/
    │   ├── index.ts              # Definición de rutas (React Router)
    │   └── loaders.ts            # Data loaders para rutas
    │
    ├── layout/
    │   └── MainLayout.tsx        # Layout principal (Header + Footer)
    │
    ├── pages/
    │   ├── HomePage.tsx          # Página inicial /
    │   ├── SearchPage.tsx        # Página búsqueda /search
    │   ├── MovieDetailPage.tsx   # Detalle película /movies/:id
    │   └── NotFoundPage.tsx      # Página 404 *
    │
    ├── components/
    │   ├── atoms/                # Componentes atómicos (pequeños)
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Rating.tsx
    │   │   └── index.ts          # Exports
    │   │
    │   ├── molecules/            # Componentes moleculares (medianos)
    │   │   ├── MovieCard.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── GenreFilter.tsx
    │   │   └── index.ts          # Exports
    │   │
    │   └── organisms/            # Componentes organismos (grandes)
    │       ├── MovieGrid.tsx
    │       ├── MovieFilters.tsx
    │       ├── MovieHero.tsx
    │       └── index.ts          # Exports
    │
    ├── services/
    │   ├── movieService.ts       # API simulada (mock) con AJAX delays
    │   └── mockMovies.ts         # Datos de películas
    │
    └── types/
        └── movie.ts              # Interfaces TypeScript
```

## 🔗 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `HomePage` | Catálogo principal con recomendaciones |
| `/search` | `SearchPage` | Búsqueda avanzada con filtros |
| `/movies/:id` | `MovieDetailPage` | Detalles de película específica |
| `*` | `NotFoundPage` | Página 404 para rutas inexistentes |

## 🧩 Jerarquía de Componentes

### Atoms (Componentes Atómicos)
Elementos básicos y reutilizables:
- `Button` - Botión con variantes
- `Input` - Campo de entrada
- `Badge` - Etiqueta/tag
- `Rating` - Indicador de calificación circular

### Molecules (Componentes Moleculares)
Combinaciones de atoms:
- `MovieCard` - Tarjeta de película (imagen + título + géneros)
- `SearchBar` - Barra búsqueda (input + botón)
- `GenreFilter` - Selector de géneros (botones)

### Organisms (Componentes Organismos)
Secciones complejas:
- `MovieGrid` - Grid responsivo de películas
- `MovieFilters` - Panel completo de filtros avanzados
- `MovieHero` - Sección hero con película destacada

### Layout
- `MainLayout` - Estructura principal (header + main + footer)

### Pages
- `HomePage` - Página inicial
- `SearchPage` - Búsqueda
- `MovieDetailPage` - Detalles
- `NotFoundPage` - 404

## 📝 Estructura de Datos

### Movie Interface
```typescript
interface Movie {
  id: number              // ID único
  title: string          // Título
  description: string    // Sinopsis
  poster: string         // URL póster
  backdrop: string       // URL fondo
  releaseDate: string    // Fecha (YYYY-MM-DD)
  rating: number         // 0-10
  genre: string[]        // ["Drama", "Action", ...]
  duration: number       // Minutos
  director: string       // Nombre director
  cast: string[]         // ["Actor 1", "Actor 2", ...]
}
```

### SearchParams Interface
```typescript
interface SearchParams {
  query?: string                        // Búsqueda por texto
  genre?: string                        // Filtro género
  year?: number                         // Filtro año
  sortBy?: 'rating' | 'release' | 'title'  // Ordenamiento
}
```

## 🎨 Estilos y Diseño

- **Framework**: Tailwind CSS 3.3
- **Tema**: Dark mode con acentos en rojo (#e50914)
- **Responsivo**: Mobile, Tablet, Desktop
- **Colores principales**:
  - Primary: `#e50914` (Rojo Netflix)
  - Secondary: `#221f1f` (Negro)
  - Background: `#0f0f0f` (Negro muy oscuro)
  - Text: `#ffffff` (Blanco)

## 🚀 Scripts npm

```bash
npm run dev      # Inicia servidor de desarrollo (Vite)
npm run build    # Build para producción (TypeScript + Vite)
npm run preview  # Vista previa del build
```

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "typescript": "^5.3.0",
  "tailwindcss": "^3.3.0",
  "vite": "^5.0.0"
}
```

## 🔄 Flujo de Datos

```
MainLayout
├── HomePage
│   ├── MovieHero (película destacada)
│   └── MovieGrid (catálogo)
│       └── MovieCard x N
│
├── SearchPage
│   ├── SearchBar (búsqueda rápida)
│   ├── MovieFilters (sidebar filtros)
│   └── MovieGrid (resultados)
│
└── MovieDetailPage
    └── [Detalles película completos]
```

## 🔌 Mock API (movieService.ts)

Métodos disponibles:
- `getAllMovies()` - Todas las películas
- `getMovieById(id)` - Película específica
- `searchByTitle(query)` - Búsqueda por título
- `searchByGenre(genre)` - Filtro por género
- `filterByYear(year)` - Filtro por año
- `advancedSearch(params)` - Búsqueda con múltiples filtros
- `getRecommended()` - Top 6 películas
- `getGenres()` - Lista de géneros

Todos tienen delays simulados (200-600ms) para representar AJAX calls reales.
