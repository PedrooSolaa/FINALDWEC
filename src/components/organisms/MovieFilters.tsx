import { useState } from 'react'
import Input from '@components/atoms/Input'
import Button from '@components/atoms/Button'
import GenreFilter from '@components/molecules/GenreFilter'

interface MovieFiltersProps {
  genres: string[]
  onFilter: (filters: {
    genre?: string | null
    year?: number | null
    sortBy?: 'rating' | 'release' | 'title'
  }) => void
  isLoading?: boolean
}

export default function MovieFilters({
  genres,
  onFilter,
  isLoading = false,
}: MovieFiltersProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [year, setYear] = useState<string>('')
  const [sortBy, setSortBy] = useState<'rating' | 'release' | 'title'>('rating')

  const handleApplyFilters = () => {
    onFilter({
      genre: selectedGenre,
      year: year ? parseInt(year) : null,
      sortBy,
    })
  }

  const handleReset = () => {
    setSelectedGenre(null)
    setYear('')
    setSortBy('rating')
    onFilter({})
  }

  return (
    <div className="moviefilters--container bg-gray-800 rounded-lg p-6 space-y-6">
      <h2 className="text-white text-2xl font-bold">Filtros Avanzados</h2>

      {/* Filtro por género */}
      <div>
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />
      </div>

      {/* Filtro por año */}
      <div className="space-y-2">
        <label className="text-white font-semibold">Año de lanzamiento</label>
        <Input
          type="number"
          placeholder="Ej: 2020"
          value={year}
          onChange={setYear}
          disabled={isLoading}
        />
      </div>

      {/* Ordenar por */}
      <div className="space-y-2">
        <label className="text-white font-semibold">Ordenar por</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'rating' | 'release' | 'title')}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none"
        >
          <option value="rating">Calificación (Mayor a menor)</option>
          <option value="release">Fecha de lanzamiento (Más reciente)</option>
          <option value="title">Título (A-Z)</option>
        </select>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleApplyFilters}
          disabled={isLoading}
          className="flex-1"
        >
          Aplicar Filtros
        </Button>
        <Button
          onClick={handleReset}
          variant="secondary"
          disabled={isLoading}
          className="flex-1"
        >
          Limpiar
        </Button>
      </div>
    </div>
  )
}
