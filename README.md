# **MovieFlix - Aplicación de Películas SPA**

Una aplicación de página única (SPA) desarrollada con React, TypeScript y React Router que permite explorar un catálogo de películas, buscar, filtrar y ver detalles detallados de cada película.

---

## **Objetivos**

1. **Desarrollar una SPA completa** utilizando React y TypeScript con enrutamiento mediante React Router.
2. **Implementar búsqueda avanzada** con múltiples criterios de filtrado (título, género, año, ordenamiento).
3. **Simular solicitudes AJAX** mediante una API mock que retrasa las respuestas para simular un servidor real.
4. **Crear una arquitectura de componentes escalable** siguiendo el patrón atómico (atoms, molecules, organisms).
5. **Aplicar estilos modernos** utilizando Tailwind CSS con diseño responsivo.
6. **Implementar rutas dinámicas** como `/movies/:id` para ver detalles de películas individuales.

---

## **Características**

✅ **Catálogo de Películas** - Visualización de películas en grid responsivo  
✅ **Búsqueda por Título** - Búsqueda rápida en tiempo real  
✅ **Filtrado por Género** - Filtrar películas seleccionando géneros  
✅ **Filtrado por Año** - Seleccionar películas de años específicos  
✅ **Ordenamiento** - Ordenar por calificación, fecha de lanzamiento o título  
✅ **Detalles de Película** - Página completa con información detallada (parámetro dinámico `:id`)  
✅ **Recomendaciones** - Sección de películas mejor calificadas en home  
✅ **Interfaz Responsiva** - Optimizada para móvil, tablet y escritorio  
✅ **Carga Asincrónica** - Simulación de AJAX calls con delay  
✅ **Navegación Intuitiva** - Header sticky, breadcrumbs, navegación clara  

---

## **Prototipo UI**

### **Estructura General**

```
┌─────────────────────────────────────┐
│  MovieFlix  |  Home | Búsqueda | GitHub
├─────────────────────────────────────┤
│                                     │
│  [    PELÍCULA DESTACADA   ]        │
│  [  Poster | Detalles Película ]    │
│                                     │
├─────────────────────────────────────┤
│  PELÍCULAS RECOMENDADAS             │
│  [Card] [Card] [Card] [Card]        │
│                                     │
├─────────────────────────────────────┤
│  CATÁLOGO COMPLETO                  │
│  [Card] [Card] [Card] [Card]        │
│  [Card] [Card] [Card] [Card]        │
│                                     │
├─────────────────────────────────────┤
│ Footer | Enlaces | Información      │
└─────────────────────────────────────┘
```

### **Página de Búsqueda**

```
BÚSQUEDA AVANZADA
[Barra de Búsqueda        ] [Buscar]

┌──────────────────┬─────────────────────────┐
│  FILTROS         │  RESULTADOS             │
│  ────────────    │  ─────────────────────  │
│  Título: [____]  │  [Card] [Card] [Card]   │
│  Géneros: [x]    │  [Card] [Card] [Card]   │
│  Año: [____]     │  [Card] [Card] [Card]   │
│  Ordenar: [DD]   │                         │
│  [Aplicar]       │                         │
│  [Limpiar]       │                         │
└──────────────────┴─────────────────────────┘
```

### **Página de Detalles**

```
Home / Película

[BACKDROP]

┌──────────┬──────────────────────────┐
│ [Poster] │ TÍTULO PELÍCULA  (2024)  │
│          │                          │
│  [Play]  │ METADATA                 │
│  [♥]     │ ⭐8.5/10 | 148min | ...  │
│          │ GÉNEROS                  │
│          │ [Drama] [Thriller] [...]  │
│          │                          │
│          │ SINOPSIS                 │
│          │ Lorem ipsum dolor...     │
│          │                          │
│          │ ELENCO PRINCIPAL         │
│          │ [Actor 1] [Actor 2]      │
│          │ [Actor 3] [Actor 4]      │
└──────────┴──────────────────────────┘
```

---

## **Tecnologías Utilizadas**

### **Frontend Framework**
- **React 18.2** - Librería UI
- **TypeScript 5.3** - Tipado estático
- **React Router 6.20** - Enrutamiento SPA

### **Herramientas de Build**
- **Vite 5.0** - Bundler y dev server
- **@vitejs/plugin-react** - Plugin React para Vite
- **PostCSS** - Procesador CSS

### **Estilos**
- **Tailwind CSS 3.3** - Framework CSS utilitario
- **Autoprefixer** - Prefijos CSS automáticos

### **Desarrollo**
- **Node.js** - Runtime JavaScript
- **npm** - Gestor de paquetes

### **API**
- **Mock API (personalizada)** - API simulada en `src/services/movieService.ts`

---

## **Instrucciones de Instalación**

### **Requisitos Previos**
- Node.js 16+ y npm instalados
- Git para clonar el repositorio

### **Pasos de Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/movieflix.git
   cd movieflix
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

4. **Build para producción**
   ```bash
   npm run build
   ```

5. **Vista previa del build**
   ```bash
   npm run preview
   ```

---

## **Guía de Uso**

### **Pantalla Principal (Home)**

- **Hero Section**: Muestra la película destacada con opciones de "Ver detalles" y "Agregar a favoritos"
- **Películas Recomendadas**: Top 6 películas mejor calificadas
- **Catálogo Completo**: Grid de todas las películas disponibles
- **Cards de Película**: Hover para ver opciones, click para ir a detalles

### **Página de Búsqueda**

1. **Búsqueda Rápida** (arriba)
   - Escribe un título y presiona Enter o click en "Buscar"
   - Busca en títulos y descripciones

2. **Filtros Avanzados** (sidebar izquierdo)
   - **Búsqueda por Título**: Refina resultados
   - **Género**: Click en un género para filtrar
   - **Año**: Especifica año de lanzamiento
   - **Ordenar por**: Calificación, fecha o título

3. **Resultados** (área principal)
   - Se actualiza automáticamente al aplicar filtros
   - Muestra cantidad de películas encontradas

### **Página de Detalles de Película**

- **Información Completa**: Título, año, duración, director, género
- **Calificación Visual**: Círculo de progreso con rating
- **Sinopsis Completa**: Descripción detallada
- **Elenco Principal**: Actores de la película
- **Navegación**: Link para volver al catálogo

---

## **Documentación de la API**

### **Mock API - movieService.ts**

La API es simulada con delays para representar solicitudes reales. Todos los datos se almacenan en `src/services/mockMovies.ts`.

#### **Métodos Disponibles**

| Método | Descripción | Parámetros | Retorna |
|--------|-------------|-----------|---------|
| `getAllMovies()` | Obtiene todas las películas | - | `Promise<Movie[]>` |
| `getMovieById(id)` | Obtiene película por ID | `id: number` | `Promise<Movie \| undefined>` |
| `searchByTitle(query)` | Busca por título | `query: string` | `Promise<Movie[]>` |
| `searchByGenre(genre)` | Busca por género | `genre: string` | `Promise<Movie[]>` |
| `filterByYear(year)` | Filtra por año | `year: number` | `Promise<Movie[]>` |
| `advancedSearch(params)` | Búsqueda con múltiples filtros | `SearchParams` | `Promise<Movie[]>` |
| `getRecommended()` | Top 6 películas mejor calificadas | - | `Promise<Movie[]>` |
| `getGenres()` | Lista de géneros únicos | - | `Promise<string[]>` |

#### **Estructura de Datos - Movie**

```typescript
interface Movie {
  id: number                  // ID único
  title: string              // Título película
  description: string        // Sinopsis
  poster: string             // URL imagen póster
  backdrop: string           // URL imagen fondo
  releaseDate: string        // Fecha lanzamiento (YYYY-MM-DD)
  rating: number             // Calificación 0-10
  genre: string[]            // Array de géneros
  duration: number           // Duración en minutos
  director: string           // Director/a
  cast: string[]             // Array con elenco
}
```

#### **Ejemplo de Uso**

```typescript
// Búsqueda simple
const movies = await movieService.searchByTitle('The Matrix');

// Búsqueda avanzada
const filtered = await movieService.advancedSearch({
  query: 'Matrix',
  genre: 'Sci-Fi',
  year: 1999,
  sortBy: 'rating'
});

// Obtener película específica
const movie = await movieService.getMovieById(1);
```

---

## **Notas de Implementación**

### **Estructura de Carpetas**

```
src/
├── components/
│   ├── atoms/              # Componentes más pequeños
│   │   ├── Button.tsx      # Botón reutilizable
│   │   ├── Input.tsx       # Input de formulario
│   │   ├── Badge.tsx       # Badge/etiqueta
│   │   └── Rating.tsx      # Círculo de rating
│   ├── molecules/          # Combinación de atoms
│   │   ├── MovieCard.tsx   # Tarjeta película
│   │   ├── SearchBar.tsx   # Barra búsqueda
│   │   └── GenreFilter.tsx # Filtro género
│   └── organisms/          # Componentes complejos
│       ├── MovieGrid.tsx   # Grid de películas
│       ├── MovieFilters.tsx # Panel de filtros
│       └── MovieHero.tsx   # Sección hero
├── layout/
│   └── MainLayout.tsx      # Layout principal (Header, Footer)
├── pages/
│   ├── HomePage.tsx        # Página inicial
│   ├── SearchPage.tsx      # Página búsqueda
│   ├── MovieDetailPage.tsx # Detalle película (/:id)
│   └── NotFoundPage.tsx    # Página 404
├── router/
│   ├── index.ts           # Definición de rutas
│   └── loaders.ts         # Data loaders para React Router
├── services/
│   ├── movieService.ts    # API simulada
│   └── mockMovies.ts      # Datos mock
├── types/
│   └── movie.ts           # Interfaces TypeScript
├── App.tsx                # App principal
├── main.tsx               # Entrada
└── index.css              # Estilos globales (Tailwind)
```

### **Componentes Principales**

#### **Atoms (Atómicos)**
- `Button`: Botón con variantes (primary, secondary, outline) y tamaños
- `Input`: Campo de entrada con estilos y validación
- `Badge`: Etiqueta de categoría con variantes de color
- `Rating`: Círculo visual de calificación

#### **Molecules (Moleculares)**
- `MovieCard`: Tarjeta con imagen, título, año y géneros
- `SearchBar`: Input + Botón para búsqueda
- `GenreFilter`: Botones de selección de géneros

#### **Organisms (Organismos)**
- `MovieGrid`: Grid responsive de películas con loading skeleton
- `MovieFilters`: Panel completo con todos los filtros
- `MovieHero`: Sección hero con película destacada

#### **Layout**
- `MainLayout`: Header con nav, router outlet, footer

### **Rutas Implementadas**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Página inicial con catálogo |
| `/search` | SearchPage | Búsqueda y filtros avanzados |
| `/movies/:id` | MovieDetailPage | Detalles película (param dinámico) |
| `*` | NotFoundPage | Página 404 |

### **Características de Estilo**

- **Tailwind CSS**: Utilitarios para responsive design
- **Dark Theme**: Colores oscuros con acentos en rojo (#e50914)
- **BEM Naming**: Clases organizadas por componente
- **Responsive**: Mobile-first, optimizado para todos los tamaños
- **Animaciones**: Hover effects, transiciones suaves

### **Diseño Responsivo**

- **Mobile** (< 640px): Grid 1 columna
- **Tablet** (640px - 1024px): Grid 2-3 columnas
- **Desktop** (> 1024px): Grid 3-4 columnas

---

## **Criterios de Evaluación (Rúbrica)**

| Criterio | Descripción | Puntos |
|----------|-------------|--------|
| **Estructura del Proyecto** | Carpetas correctamente organizadas (router, layout, pages, components, services, types) | 10 |
| **Diseño de Componentes** | Componentes atómicos, moleculares, organismos, layout y rutas bien definidos | 15 |
| **Rutas y Navegación** | React Router implementado con SPA, rutas dinámicas (`/movies/:id`), navegación fluida | 10 |
| **Integración de API** | Solicitudes AJAX funcionales, múltiples búsquedas, filtrado de datos avanzado | 10 |
| **Estilos** | Tailwind CSS bien aplicado, diseño responsivo, tema visual coherente | 10 |
| **Documentación** | README completo (Objetivos, Características, Prototipos, Tecnologías, Instalación, Uso, API, Implementación, Deploy) | 15 |
| **Calidad del Código** | Código limpio, legible, bien estructurado, sin errores | 10 |
| **Presentación y Q&A** | Presentación clara, respuestas detalladas en preguntas | 20 |
| **TOTAL** | | **100** |

---

## **Aplicación Desplegada**

> **Nota**: La aplicación está lista para deployar en servicios como:
> - **Vercel**: https://vercel.com (Recomendado para Vite + React)
> - **GitHub Pages**: Mediante GitHub Actions
> - **Netlify**: https://netlify.com

### **Para Deployar en Vercel (Recomendado)**

1. Hacer push a GitHub
2. Conectar repositorio en [vercel.com](https://vercel.com)
3. Vercel detectará automáticamente Vite y hará el build
4. La aplicación estará en vivo en minutos

### **Para Deployar en GitHub Pages**

1. Actualizar `vite.config.ts` con `base: '/movie-spa/'`
2. Ejecutar: `npm run build`
3. Los archivos en `dist/` subirán a `gh-pages` branch
4. Acceder en: `https://tu-usuario.github.io/movie-spa`

---

## **Autores**

- Desarrollado como Proyecto Final del módulo **DWEC** (Desarrollo Web en Entorno Cliente)
- Curso: Grado Superior en Desarrollo de Aplicaciones Web

---

## **Licencia**

Este proyecto es de carácter educativo. Todos los derechos reservados.

---

**Última actualización**: Febrero 2026  
**Estado**: ✅ Completo y funcional

El proyecto será evaluado con base en los siguientes aspectos:

| Criterio                    | Descripción                                                                    | Puntos  |
| --------------------------- | ------------------------------------------------------------------------------ | ------- |
| **Estructura del Proyecto** | Organización adecuada de carpetas y modularidad                                | 10      |
| **Diseño de Componentes**   | Uso de componentes atómicos, moleculares, organismos, layout y rutas           | 15      |
| **Rutas y Navegación**      | Implementación de React Router para SPA, incluyendo rutas dinámicas            | 10      |
| **Integración de API**      | Uso correcto de solicitudes AJAX, múltiples búsquedas en API y filtrado        | 10      |
| **Estilos**                 | Aplicación adecuada de metodologías CSS y estilos dentro de componentes        | 10      |
| **Documentación**           | README completo con todas las secciones requeridas, incluyendo UI y despliegue | 15      |
| **Calidad del Código**      | Código limpio, legible y mantenible                                            | 10      |
| **Presentación y Q&A**      | Claridad y profundidad en la presentación oral y respuestas a preguntas        | 20      |
| **Total**                   | **Puntaje final sobre 100**                                                    | **100** |

Cada miembro del equipo recibirá una **calificación individual** basada en su participación en la presentación y sus respuestas durante la sesión de preguntas y respuestas. Todos los items anteriores serán comunes para el grupo, salvo la parte de presentación, que será individual para cada uno.

Este proyecto final servirá como una **demostración práctica** de la capacidad de los estudiantes para trabajar con **React, TypeScript, React Router, integración de API, arquitectura de componentes y metodologías de estilización**.
