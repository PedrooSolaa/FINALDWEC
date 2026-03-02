import { Movie, SearchParams } from '../types/movie'
import { mockMovies } from './mockMovies'
import { favoritesService } from './favoritesService.ts'

// Simulación de AJAX con delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const omdbApiKey = import.meta.env.VITE_OMDB_API_KEY || 'c380740c'
const omdbCache = new Map<string, Movie | null>()
const omdbMoviesCache = new Map<string, Movie[]>()

interface OmdbSearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface OmdbMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Plot: string
  Director: string
  Actors: string
  Runtime: string
  imdbRating: string
  Genre: string
  Released: string
}

const fetchOmdbMovieDetails = async (imdbID: string): Promise<OmdbMovie | null> => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}&type=movie`
    )

    if (!response.ok) return null

    const data = await response.json()
    if (data?.Response === 'False') return null
    if (data.Type !== 'movie') return null

    return data as OmdbMovie
  } catch {
    return null
  }
}

const transformOmdbToMovie = (omdbMovie: OmdbMovie, id: number): Movie => {
  const runtime = parseInt(omdbMovie.Runtime) || 0
  const rating = parseFloat(omdbMovie.imdbRating) || 0
  const genres = omdbMovie.Genre?.split(', ') || []
  const cast = omdbMovie.Actors?.split(', ').slice(0, 2) || []

  return {
    id,
    title: omdbMovie.Title,
    description: omdbMovie.Plot || 'No description available',
    poster: omdbMovie.Poster && omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : '',
    backdrop: omdbMovie.Poster && omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : '',
    releaseDate: omdbMovie.Released || `${omdbMovie.Year}-01-01`,
    rating,
    genre: genres,
    duration: runtime,
    director: omdbMovie.Director || 'Unknown',
    cast,
  }
}

const fetchOmdbMovies = async (): Promise<Movie[]> => {
  const cacheKey = 'omdb_all_movies'
  if (omdbMoviesCache.has(cacheKey)) {
    return omdbMoviesCache.get(cacheKey) || []
  }

  const searchQueries = [
    'movie',
    'film',
    'action',
    'drama',
    'thriller',
    'comedy',
    'horror',
    'romance',
    'adventure',
    'sci-fi',
  ]

  const allMovies: Movie[] = []
  const seenImdbIds = new Set<string>()
  let movieId = 1

  try {
    for (const query of searchQueries) {
      for (let page = 1; page <= 3; page++) {
        await delay(300) // Para evitar rate limiting

        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${omdbApiKey}&type=movie`
        )

        if (!response.ok) continue

        const data = await response.json()

        if (data?.Response === 'False' || !data?.Search) continue

        for (const result of data.Search) {
          const searchResult = result as OmdbSearchResult
          if (seenImdbIds.has(searchResult.imdbID)) continue
          if (searchResult.Type !== 'movie') continue

          seenImdbIds.add(searchResult.imdbID)

          const movieDetails = await fetchOmdbMovieDetails(searchResult.imdbID)
          if (movieDetails) {
            const movie = transformOmdbToMovie(movieDetails, movieId++)
            allMovies.push(movie)

            if (allMovies.length >= 50) break
          }
        }

        if (allMovies.length >= 50) break
      }

      if (allMovies.length >= 50) break
    }
  } catch (error) {
    console.error('Error fetching OMDB movies:', error)
  }

  // Si obtenemos películas de OMDB, las cacheamos, si no, usamos mockMovies
  const moviesToCache = allMovies.length > 0 ? allMovies : mockMovies
  omdbMoviesCache.set(cacheKey, moviesToCache)

  return moviesToCache
}

const fetchOmdbImage = async (title: string) => {
  if (!omdbApiKey) return null

  const cached = omdbCache.get(title)
  if (cached !== undefined) return cached

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${omdbApiKey}&type=movie`
    )

    if (!response.ok) {
      omdbCache.set(title, null)
      return null
    }

    const data = await response.json()
    if (data?.Response === 'False') {
      omdbCache.set(title, null)
      return null
    }

    if (data?.Poster && data.Poster !== 'N/A') {
      const movie = transformOmdbToMovie(data as OmdbMovie, 0)
      omdbCache.set(title, movie)
      return movie
    }
  } catch {
    omdbCache.set(title, null)
    return null
  }

  omdbCache.set(title, null)
  return null
}

const withImages = async (movie: Movie): Promise<Movie> => {
  const enriched = await fetchOmdbImage(movie.title)
  return enriched && enriched.poster ? { ...movie, poster: enriched.poster, backdrop: enriched.backdrop } : movie
}

const withImagesList = async (movies: Movie[]): Promise<Movie[]> => {
  const hydrated = await Promise.all(movies.map(movie => withImages(movie)))
  return hydrated
}

export const movieService = {
  // Obtener todas las películas de OMDB
  getAllMovies: async (): Promise<Movie[]> => {
    await delay(500)
    return await fetchOmdbMovies()
  },

  // Obtener una película por ID (ruta dinámica)
  getMovieById: async (id: number): Promise<Movie | undefined> => {
    await delay(300)
    const movies = await fetchOmdbMovies()
    return movies.find(movie => movie.id === id)
  },

  // Buscar películas por título (búsqueda 1)
  searchByTitle: async (query: string): Promise<Movie[]> => {
    await delay(500)
    const movies = await fetchOmdbMovies()
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    )
  },

  // Buscar películas por género (búsqueda 2)
  searchByGenre: async (genre: string): Promise<Movie[]> => {
    await delay(500)
    const movies = await fetchOmdbMovies()
    return movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
    )
  },

  // Filtrar películas por año
  filterByYear: async (year: number): Promise<Movie[]> => {
    await delay(500)
    const movies = await fetchOmdbMovies()
    return movies.filter(movie => {
      const movieYear = new Date(movie.releaseDate).getFullYear()
      return movieYear === year
    })
  },

  // Búsqueda avanzada con múltiples filtros
  advancedSearch: async (params: SearchParams): Promise<Movie[]> => {
    await delay(600)
    const movies = await fetchOmdbMovies()
    let results = [...movies]

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

    return results
  },

  // Obtener películas recomendadas (top rated)
  getRecommended: async (): Promise<Movie[]> => {
    await delay(400)
    const movies = await fetchOmdbMovies()
    const sorted = [...movies].sort((a, b) => b.rating - a.rating)
    return sorted.slice(0, 6)
  },

  // Obtener películas favoritas
  getFavorites: async (): Promise<Movie[]> => {
    await delay(300)
    const favoriteIds = favoritesService.getFavoriteIds()
    if (favoriteIds.length === 0) return []
    const movies = await fetchOmdbMovies()
    return movies.filter(movie => favoriteIds.includes(movie.id))
  },

  // Obtener géneros únicos
  getGenres: async (): Promise<string[]> => {
    await delay(200)
    const movies = await fetchOmdbMovies()
    const genres = new Set<string>()
    movies.forEach(movie => {
      movie.genre.forEach(g => genres.add(g))
    })
    return Array.from(genres).sort()
  },
}
