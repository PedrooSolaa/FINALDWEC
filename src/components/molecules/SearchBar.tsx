import Button from '@components/atoms/Button'
import Input from '@components/atoms/Input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
  isLoading?: boolean
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Busca una película...',
  isLoading = false,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  // Wrapper para pasar onKeyPress al Input de manera personalizada
  return (
    <div className="searchbar--container flex gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-primary focus:outline-none transition-colors"
      />
      <Button
        onClick={onSearch}
        disabled={isLoading}
        className="whitespace-nowrap"
      >
        {isLoading ? 'Buscando...' : 'Buscar'}
      </Button>
    </div>
  )
}
