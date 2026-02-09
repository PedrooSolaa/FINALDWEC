const FAVORITES_KEY = 'movieflix:favorites'

const readFavorites = (): number[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id) => Number.isInteger(id))
  } catch {
    return []
  }
}

const writeFavorites = (ids: number[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids))
}

export const favoritesService = {
  getFavoriteIds: (): number[] => readFavorites(),

  isFavorite: (id: number): boolean => {
    const ids = readFavorites()
    return ids.includes(id)
  },

  toggleFavorite: (id: number): number[] => {
    const ids = readFavorites()
    const next = ids.includes(id)
      ? ids.filter((favId) => favId !== id)
      : [...ids, id]

    writeFavorites(next)
    return next
  },
}
