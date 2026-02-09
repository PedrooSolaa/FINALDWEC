import { Movie, SearchParams } from '../types/movie'
import { mockMovies } from './mockMovies'
import { favoritesService } from './favoritesService.ts'

// Simulación de AJAX con delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY || 'c380740c'
const omdbCache = new Map<string, { poster: string; backdrop: string } | null>()

const fetchOmdbImage = async (title: string) => {
  if (!omdbApiKey) return null

  const cached = omdbCache.get(title)
  if (cached !== undefined) return cached

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${omdbApiKey}`
    )

    if (!response.ok) {
      omdbCache.set(title, null)
      return null
    }

    const data = await response.json()
    if (data?.Poster && data.Poster !== 'N/A') {
      const image = { poster: data.Poster as string, backdrop: data.Poster as string }
      omdbCache.set(title, image)
      return image
    }
  } catch {
    omdbCache.set(title, null)
    return null
  }

  omdbCache.set(title, null)
  return null
}

const withImages = async (movie: Movie): Promise<Movie> => {
  const image = await fetchOmdbImage(movie.title)
  return image ? { ...movie, ...image } : movie
}

const withImagesList = async (movies: Movie[]): Promise<Movie[]> => {
  const hydrated = await Promise.all(movies.map(movie => withImages(movie)))
  return hydrated
}

export const movieService = {
  // Obtener todas las películas
  getAllMovies: async (): Promise<Movie[]> => {
    await delay(500)
    return withImagesList(mockMovies)
  },

  // Obtener una película por ID (ruta dinámica)
  getMovieById: async (id: number): Promise<Movie | undefined> => {
    await delay(300)
    const movie = mockMovies.find(movie => movie.id === id)
    if (!movie) return undefined
    return withImages(movie)
  },

  // Buscar películas por título (búsqueda 1)
  searchByTitle: async (query: string): Promise<Movie[]> => {
    await delay(500)
    const results = mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    )
    return withImagesList(results)
  },

  // Buscar películas por género (búsqueda 2)
  searchByGenre: async (genre: string): Promise<Movie[]> => {
    await delay(500)
    const results = mockMovies.filter(movie =>
      movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    )
    return withImagesList(results)
  },

  // Filtrar películas por año
  filterByYear: async (year: number): Promise<Movie[]> => {
    await delay(500)
    const results = mockMovies.filter(movie => {
      const movieYear = new Date(movie.releaseDate).getFullYear()
      return movieYear === year
    })
    return withImagesList(results)
  },

  // Búsqueda avanzada con múltiples filtros
  advancedSearch: async (params: SearchParams): Promise<Movie[]> => {
    await delay(600)
    let results = [...mockMovies]

    if (params.query) {
      results = results.filter(movie =>
        movie.title.toLowerCase().includes(params.query!.toLowerCase()) ||
        movie.description.toLowerCase().includes(params.query!.toLowerCase())
      )
    }

    if (params.genre) {
      results = results.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === params.genre!.toLowerCase())
      )
    }

    if (params.year) {
      results = results.filter(movie => {
        const movieYear = new Date(movie.releaseDate).getFullYear()
        return movieYear === params.year
      })
    }

    // Ordenar resultados
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating)
          break
        case 'release':
          results.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
          break
        case 'title':
          results.sort((a, b) => a.title.localeCompare(b.title))
          break
      }
    }

    return withImagesList(results)
  },

  // Obtener películas recomendadas (top rated)
  getRecommended: async (): Promise<Movie[]> => {
    await delay(400)
    const sorted = [...mockMovies].sort((a, b) => b.rating - a.rating)
    return withImagesList(sorted.slice(0, 6))
  },

  // Obtener películas favoritas
  getFavorites: async (): Promise<Movie[]> => {
    await delay(300)
    const favoriteIds = favoritesService.getFavoriteIds()
    if (favoriteIds.length === 0) return []
    const favorites = mockMovies.filter(movie => favoriteIds.includes(movie.id))
    return withImagesList(favorites)
  },

  // Obtener géneros únicos
  getGenres: async (): Promise<string[]> => {
    await delay(200)
    const genres = new Set<string>()
    mockMovies.forEach(movie => {
      movie.genre.forEach(g => genres.add(g))
    })
    return Array.from(genres).sort()
  },
}
