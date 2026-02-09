import { movieService } from '@services/movieService'

export async function moviesLoader() {
  try {
    const movies = await movieService.getAllMovies()
    return { movies }
  } catch (error) {
    console.error('Error loading movies:', error)
    return { movies: [] }
  }
}

export async function movieDetailLoader({ params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    const movie = await movieService.getMovieById(id)
    if (!movie) {
      throw new Error('Movie not found')
    }
    return { movie }
  } catch (error) {
    console.error('Error loading movie:', error)
    throw new Error('Movie not found')
  }
}
