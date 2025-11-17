'use client'

import { useState, useMemo } from 'react'
import { Footer } from '@/components/footer'
import { PriestCard } from '@/components/priest-card'
import { Button } from '@/components/ui/button'
import { Filter, SearchIcon, ChevronDown, X, Zap } from 'lucide-react'
import { mockPriests } from '@/lib/mock-data'
import { SPECIALTIES, LOCATIONS, LANGUAGES } from '@/lib/constants'
import { FilterBadge } from '@/components/filter-badge'
import { EmptyState } from '@/components/empty-state-custom'
import { useToastNotification } from '@/hooks/use-toast-notification'
import { SkeletonLoader } from '@/components/skeleton-loader'

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState(700)
  const [sortBy, setSortBy] = useState<'rating' | 'price-low' | 'price-high' | 'experience'>('rating')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastNotification()

  const filteredAndSortedPriests = useMemo(() => {
    let results = mockPriests.filter((priest) => {
      const matchSearch =
        priest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        priest.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchSpecialty = !selectedSpecialty || priest.specialty === selectedSpecialty
      const matchLocation = !selectedLocation || priest.location === selectedLocation
      const matchLanguage = !selectedLanguage || priest.languages.includes(selectedLanguage)
      const matchPrice = priest.price <= priceRange

      return matchSearch && matchSpecialty && matchLocation && matchLanguage && matchPrice
    })

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        results.sort((a, b) => b.price - a.price)
        break
      case 'experience':
        results.sort((a, b) => b.experience - a.experience)
        break
    }

    return results
  }, [searchQuery, selectedSpecialty, selectedLocation, selectedLanguage, priceRange, sortBy])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedSpecialty(null)
    setSelectedLocation(null)
    setSelectedLanguage(null)
    setPriceRange(700)
    setSortBy('rating')
    toast.info('Filters cleared')
  }

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (selectedSpecialty ? 1 : 0) +
    (selectedLocation ? 1 : 0) +
    (selectedLanguage ? 1 : 0)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Find Your Priest</h1>
            <p className="text-muted-foreground">Browse and filter from our verified network of {mockPriests.length} experienced priests</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex-1 flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-border hover:border-primary hover:ring-2 hover:ring-primary/20 transition-all">
              <SearchIcon size={20} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground text-sm"
              />
            </div>
            <Button
              variant="outline"
              className="flex gap-2 items-center justify-center sm:justify-start rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filter Section */}
          {showFilters && (
            <div className="mb-8 bg-card rounded-2xl p-6 border border-border animate-slide-in-top shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Specialty</label>
                  <select
                    value={selectedSpecialty || ''}
                    onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                    className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
                  >
                    <option value="">All Specialties</option>
                    {SPECIALTIES.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Location</label>
                  <select
                    value={selectedLocation || ''}
                    onChange={(e) => setSelectedLocation(e.target.value || null)}
                    className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
                  >
                    <option value="">All Locations</option>
                    {LOCATIONS.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Language</label>
                  <select
                    value={selectedLanguage || ''}
                    onChange={(e) => setSelectedLanguage(e.target.value || null)}
                    className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
                  >
                    <option value="">All Languages</option>
                    {LANGUAGES.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Max Price</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="300"
                      max="800"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="text-xs text-muted-foreground text-center">₹{priceRange}/hour</div>
                  </div>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-input border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary text-sm text-foreground"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="experience">Most Experience</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {activeFilterCount > 0 && (
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs"
                    onClick={handleClearFilters}
                  >
                    <X size={14} />
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="mb-6 animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <FilterBadge
                    label="Search"
                    value={searchQuery}
                    onRemove={() => setSearchQuery('')}
                  />
                )}
                {selectedSpecialty && (
                  <FilterBadge
                    label="Specialty"
                    value={selectedSpecialty}
                    onRemove={() => setSelectedSpecialty(null)}
                  />
                )}
                {selectedLocation && (
                  <FilterBadge
                    label="Location"
                    value={selectedLocation}
                    onRemove={() => setSelectedLocation(null)}
                  />
                )}
                {selectedLanguage && (
                  <FilterBadge
                    label="Language"
                    value={selectedLanguage}
                    onRemove={() => setSelectedLanguage(null)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="mb-6 flex justify-between items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredAndSortedPriests.length}</span> priest{filteredAndSortedPriests.length !== 1 ? 's' : ''}
            </div>
            {filteredAndSortedPriests.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Zap size={14} className="text-yellow-500" />
                Updated just now
              </div>
            )}
          </div>

          {/* Priests Grid or Empty State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : filteredAndSortedPriests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedPriests.map((priest, idx) => (
                <div key={priest.id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <PriestCard {...priest} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12">
              <EmptyState
                icon={<SearchIcon size={48} className="text-muted-foreground" />}
                title="No priests found"
                description="Try adjusting your filters or search criteria to find the perfect priest for your needs."
                actionLabel="Clear Filters"
                onAction={handleClearFilters}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
