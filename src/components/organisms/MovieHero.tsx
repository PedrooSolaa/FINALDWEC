import { Link } from 'react-router-dom'
import { Movie } from '../../types/movie'
import Button from '@components/atoms/Button'
import Badge from '@components/atoms/Badge'
import Rating from '@components/atoms/Rating'

interface MovieHeroProps {
  movie: Movie
}

export default function MovieHero({ movie }: MovieHeroProps) {
  return (
    <div className="moviehero--container relative h-96 rounded-lg overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
      <div
        className="moviehero__background absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
        }}
      />
      <div className="moviehero__overlay absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      <div className="moviehero--content relative z-10 h-full flex items-center">
        <div className="p-8 max-w-2xl">
          <h1 className="moviehero__title text-5xl font-bold text-white mb-4">
            {movie.title}
          </h1>

          <div className="moviehero__meta flex items-center gap-4 mb-4">
            <Rating value={movie.rating} />
            <span className="text-gray-300">
              {new Date(movie.releaseDate).getFullYear()}
            </span>
            <span className="text-gray-300">
              {movie.duration} min
            </span>
          </div>

          <div className="moviehero__genres flex flex-wrap gap-2 mb-4">
            {movie.genre.map((g) => (
              <Badge key={g} variant="primary">
                {g}
              </Badge>
            ))}
          </div>

          <p className="moviehero__description text-gray-200 mb-6 line-clamp-3 text-lg">
            {movie.description}
          </p>

          <div className="moviehero__actions flex gap-3">
            <Link to={`/movies/${movie.id}`}>
              <Button size="lg" className="flex items-center gap-2">
                <span>Ver detalles</span>
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Agregar a favoritos
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
