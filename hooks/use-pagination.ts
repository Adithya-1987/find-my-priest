import { useState, useMemo } from 'react'

interface PaginationOptions {
  itemsPerPage: number
}

export function usePagination<T>(items: T[], options: PaginationOptions) {
  const [currentPage, setCurrentPage] = useState(1)
  const { itemsPerPage } = options

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  }
}
