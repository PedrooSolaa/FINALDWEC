import { useState } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { Movie } from '../types/movie'
import Badge from '@components/atoms/Badge'
import Button from '@components/atoms/Button'
import Rating from '@components/atoms/Rating'
import { favoritesService } from '@services/favoritesService'

export default function MovieDetailPage() {
  const { movie } = useLoaderData() as { movie: Movie }
  const [posterError, setPosterError] = useState(false)
  const [isFavorite, setIsFavorite] = useState(
    favoritesService.isFavorite(movie.id)
  )

  const releaseYear = new Date(movie.releaseDate).getFullYear()
  const releaseDate = new Date(movie.releaseDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="moviedetailpage--container space-y-8">
      {/* Breadcrumb */}
      <nav className="moviedetailpage__breadcrumb text-gray-400">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{movie.title}</span>
      </nav>

      {/* Hero con backdrop */}
      <div className="moviedetailpage__hero relative h-96 rounded-lg overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Poster (columna izquierda) */}
        <aside className="lg:col-span-1">
          <div className="moviedetailpage__poster sticky top-24">
            {!posterError ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
                onError={() => setPosterError(true)}
              />
            ) : (
              <div className="w-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-lg flex items-center justify-center h-80">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-400 font-semibold">{movie.title}</p>
                </div>
              </div>
            )}
            <div className="mt-6 space-y-3">
              <Button className="w-full">▶ Ver Película</Button>
              <Button
                variant={isFavorite ? 'secondary' : 'outline'}
                className="w-full"
                onClick={() => {
                  favoritesService.toggleFavorite(movie.id)
                  setIsFavorite((prev) => !prev)
                }}
              >
                {isFavorite ? '✓ En favoritos' : '♥ Favorito'}
              </Button>
            </div>
          </div>
        </aside>

        {/* Detalles (columna derecha) */}
        <main className="lg:col-span-3 space-y-6">
          {/* Título y año */}
          <div>
            <h1 className="moviedetailpage__title text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            <p className="text-2xl text-gray-400">
              {releaseYear}
            </p>
          </div>

          {/* Metadata */}
          <div className="moviedetailpage__metadata grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800 rounded-lg p-6">
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-2">CALIFICACIÓN</p>
              <Rating value={movie.rating} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-2">DURACIÓN</p>
              <p className="text-white text-xl font-bold">{movie.duration} min</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-2">ESTRENO</p>
              <p className="text-white text-lg">{releaseDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-2">DIRECTOR</p>
              <p className="text-white text-lg">{movie.director}</p>
            </div>
          </div>

          {/* Géneros */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Géneros</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="primary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sinopsis */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Sinopsis</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Elenco */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Elenco Principal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.cast.map((actor) => (
                <div key={actor} className="bg-gray-800 rounded-lg p-4">
                  <p className="text-white font-semibold">{actor}</p>
                  <p className="text-gray-400 text-sm">Actor</p>
                </div>
              ))}
            </div>
          </div>

          {/* Volver */}
          <div className="pt-6">
            <Link to="/">
              <Button variant="secondary">
                ← Volver al catálogo
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
