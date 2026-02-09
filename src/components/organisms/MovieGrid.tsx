import { Movie } from '../../types/movie'
import MovieCard from '@components/molecules/MovieCard'

interface MovieGridProps {
  movies: Movie[]
  isLoading?: boolean
  emptyMessage?: string
}

export default function MovieGrid({
  movies,
  isLoading = false,
  emptyMessage = 'No se encontraron películas',
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="moviegrid--container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-700 h-64 rounded-lg mb-3" />
            <div className="bg-gray-700 h-4 rounded mb-2" />
            <div className="bg-gray-700 h-4 w-2/3 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="moviegrid--empty flex items-center justify-center py-12">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="moviegrid--container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
