import Badge from '@components/atoms/Badge'

interface GenreFilterProps {
  genres: string[]
  selectedGenre: string | null
  onSelectGenre: (genre: string | null) => void
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onSelectGenre,
}: GenreFilterProps) {
  return (
    <div className="genrefilter--container">
      <h3 className="text-white font-semibold mb-3">Géneros</h3>
      <div className="genrefilter__list flex flex-wrap gap-2">
        <button
          onClick={() => onSelectGenre(null)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            selectedGenre === null
              ? 'bg-primary text-white'
              : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
          }`}
        >
          Todos
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedGenre === genre
                ? 'bg-primary text-white'
                : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}
