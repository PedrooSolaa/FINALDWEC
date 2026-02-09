# MovieFlix - Aplicacion de Peliculas SPA

MovieFlix es una SPA en React + TypeScript para explorar un catalogo de peliculas, buscar, filtrar, ver detalles y guardar favoritos.

## Objetivos
- SPA con React Router y rutas dinamicas.
- Busqueda rapida por titulo y filtros avanzados (genero, ano, orden).
- Integracion de imagenes con OMDb.
- Arquitectura de componentes (atoms, molecules, organisms).
- Estilos modernos con Tailwind CSS.

## Funcionalidades
- Catalogo completo y recomendaciones.
- Busqueda rapida por titulo.
- Filtros avanzados por genero, ano y orden.
- Detalle de pelicula en ruta dinamica `/movies/:id`.
- Favoritos persistentes en localStorage.
- UI responsive con tema de cine.

## Rutas
- `/` Home con hero, recomendaciones, favoritos y catalogo.
- `/search` Busqueda avanzada.
- `/movies/:id` Detalle de pelicula.
- `*` Pagina 404.

## Estructura (resumen)
```
src/
  components/
    atoms/       Button, Input, Badge, Rating
    molecules/   MovieCard, SearchBar, GenreFilter
    organisms/   MovieGrid, MovieFilters, MovieHero
  layout/        MainLayout
  pages/         HomePage, SearchPage, MovieDetailPage, NotFoundPage
  router/        rutas y loaders
  services/      movieService, favoritesService, mockMovies
  types/         movie.ts
```

## Datos y API
- Datos base: `src/services/mockMovies.ts`.
- Imagenes: OMDb (poster/backdrop).
- Favoritos: `localStorage`.

## Variables de entorno
Crea `.env.local` (opcional) con:
```
VITE_OMDB_API_KEY=tu_api_key
```

## Instalacion y uso
```
npm install
npm run dev
```
Abrir `http://localhost:5173`.

## Favoritos
- En el detalle de una pelicula, usa el boton **Favorito**.
- En Home, la seccion **Tus Favoritos** muestra lo guardado.

## Notas de desarrollo
- Los filtros avanzados ya no incluyen busqueda por titulo.
- Las sinopsis estan en espanol.
- Si una imagen falla, hay placeholder automatico.

## Tecnologias
- React 18
- TypeScript 5
- React Router 6
- Vite 5
- Tailwind CSS 3
- OMDb API
