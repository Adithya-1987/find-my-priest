import { useState, useCallback } from 'react'

interface FilterState {
  [key: string]: string | string[] | number
}

export function useFilters<T extends FilterState>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters)

  const updateFilter = useCallback((key: keyof T, value: T[keyof T]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  return { filters, updateFilter, resetFilters }
}
