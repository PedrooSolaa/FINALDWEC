import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import Badge from '@components/atoms/Badge'
import Rating from '@components/atoms/Rating'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="moviecard--container group cursor-pointer h-full">
        <div className="moviecard--image-wrapper relative overflow-hidden rounded-lg bg-gray-700">
          {!imageError ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-gray-400 text-sm font-semibold">{movie.title}</p>
              </div>
            </div>
          )}
          <div className="moviecard__overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
            <button className="moviecard__play-btn hidden group-hover:flex items-center justify-center w-12 h-12 rounded-full bg-primary hover:bg-red-700 transition-colors">
              <span className="text-white ml-1">▶</span>
            </button>
          </div>
          <div className="moviecard__rating absolute top-2 right-2">
            <Rating value={movie.rating} />
          </div>
        </div>
        <div className="moviecard--content p-3">
          <h3 className="moviecard__title font-bold text-white truncate text-lg group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="moviecard__year text-gray-400 text-sm mb-2">
            {new Date(movie.releaseDate).getFullYear()}
          </p>
          <div className="moviecard__genres flex flex-wrap gap-1">
            {movie.genre.map((g) => (
              <Badge key={g} variant="default" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
