import { useState, useEffect } from 'react'
import { Movie, SearchParams } from '../types/movie'
import { movieService } from '@services/movieService'
import MovieFilters from '@components/organisms/MovieFilters'
import MovieGrid from '@components/organisms/MovieGrid'
import SearchBar from '@components/molecules/SearchBar'

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentFilters, setCurrentFilters] = useState<SearchParams>({})

  // Cargar géneros al montar
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const availableGenres = await movieService.getGenres()
        setGenres(availableGenres)
      } catch (error) {
        console.error('Error loading genres:', error)
      }
    }

    loadGenres()
  }, [])

  // Búsqueda rápida por título
  const handleQuickSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Por favor escribe algo para buscar')
      return
    }

    setIsLoading(true)
    try {
      console.log('Buscando películas con:', searchQuery)
      const results = await movieService.searchByTitle(searchQuery)
      console.log('Resultados encontrados:', results)
      setMovies(results)
      setCurrentFilters({ query: searchQuery })
    } catch (error) {
      console.error('Error searching:', error)
      setMovies([])
      alert('Error en la búsqueda')
    } finally {
      setIsLoading(false)
    }
  }

  // Búsqueda avanzada con múltiples filtros
  const handleAdvancedSearch = async (filters: SearchParams) => {
    setIsLoading(true)
    try {
      console.log('Aplicando filtros:', filters)
      const results = await movieService.advancedSearch(filters)
      console.log('Películas después de filtros:', results)
      setMovies(results)
      setCurrentFilters(filters)
    } catch (error) {
      console.error('Error in advanced search:', error)
      setMovies([])
      alert('Error al aplicar filtros')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="searchpage--container space-y-8">
      {/* Encabezado */}
      <section className="searchpage__header">
        <h1 className="text-4xl font-bold text-white mb-2">Búsqueda Avanzada</h1>
        <p className="text-gray-400">
          Busca películas por título, género, año y más
        </p>
      </section>

      {/* Búsqueda rápida */}
      <section className="searchpage__quick-search">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleQuickSearch}
          isLoading={isLoading}
          placeholder="Busca por título..."
        />
      </section>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtros (sidebar) */}
        <aside className="lg:col-span-1">
          <MovieFilters
            genres={genres}
            onFilter={handleAdvancedSearch}
            isLoading={isLoading}
          />
        </aside>

        {/* Resultados */}
        <main className="lg:col-span-3">
          <div className="mb-6">
            {Object.keys(currentFilters).length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-gray-300">
                  {movies.length} película{movies.length !== 1 ? 's' : ''} encontrada{movies.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
          <MovieGrid
            movies={movies}
            isLoading={isLoading}
            emptyMessage={
              Object.keys(currentFilters).length > 0
                ? 'No se encontraron películas que coincidan con tus filtros'
                : 'Comienza a buscar películas usando los filtros'
            }
          />
        </main>
      </div>
    </div>
  )
}
