import { useEffect, useState } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import { Movie } from '../types/movie'
import { movieService } from '@services/movieService'
import MovieHero from '@components/organisms/MovieHero'
import MovieGrid from '@components/organisms/MovieGrid'

export default function HomePage() {
  const location = useLocation()
  const { movies: allMovies } = useLoaderData() as { movies: Movie[] }
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([])
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRecommended = async () => {
      try {
        const recommended = await movieService.getRecommended()
        setRecommendedMovies(recommended)
      } catch (error) {
        console.error('Error loading recommended movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRecommended()
  }, [])

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await movieService.getFavorites()
        setFavoriteMovies(favorites)
      } catch (error) {
        console.error('Error loading favorites:', error)
      } finally {
        setFavoritesLoading(false)
      }
    }

    loadFavorites()
  }, [])

  useEffect(() => {
    if (location.hash === '#favoritos') {
      const target = document.getElementById('favoritos')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.hash])

  const featuredMovie = allMovies[0]

  return (
    <div className="homepage--container space-y-12">
      {/* Hero Section */}
      {featuredMovie && (
        <section className="homepage__hero">
          <MovieHero movie={featuredMovie} />
        </section>
      )}

      {/* Recomendaciones */}
      <section className="homepage__recommended">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Películas Recomendadas</h2>
          <p className="text-gray-400">
            Descubre nuestras películas mejor calificadas
          </p>
        </div>
        <MovieGrid movies={recommendedMovies} isLoading={isLoading} />
      </section>

      {/* Favoritos */}
      <section id="favoritos" className="homepage__favorites">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Tus Favoritos</h2>
          <p className="text-gray-400">
            Tus películas guardadas para ver más tarde
          </p>
        </div>
        <MovieGrid
          movies={favoriteMovies}
          isLoading={favoritesLoading}
          emptyMessage="Aún no tienes películas favoritas"
        />
      </section>

      {/* Todas las películas */}
      <section className="homepage__all-movies">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Catálogo Completo</h2>
          <p className="text-gray-400">
            Explora todas las películas disponibles
          </p>
        </div>
        <MovieGrid movies={allMovies} />
      </section>
    </div>
  )
}
