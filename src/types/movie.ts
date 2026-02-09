export interface Movie {
  id: number
  title: string
  description: string
  poster: string
  backdrop: string
  releaseDate: string
  rating: number
  genre: string[]
  duration: number
  director: string
  cast: string[]
}

export interface SearchParams {
  query?: string
  genre?: string | null
  year?: number | null
  sortBy?: 'rating' | 'release' | 'title'
}
