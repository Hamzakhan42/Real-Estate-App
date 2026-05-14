import { useState } from 'react'
import { Search, Filter, X, RotateCcw, Building2, Bed, Bath, SlidersHorizontal } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useSearchFilters } from '../../../hooks/useSearchFilters'
import LocationInput from './LocationInput'
import RangeInput from './RangeInput'
import { SelectField, MultiSelect } from './SelectField'
import { PropertyStatusToggle, FilterChips } from './FilterElements'

const cn = (...inputs) => twMerge(clsx(inputs))

const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Plot', 'Commercial']
const bedBathOptions = ['All', 'Studio', '1', '2', '3', '4', '5', '5+']
const amenitiesOptions = ['Parking', 'Garden', 'Gym', 'Security', 'Furnished', 'Pool', 'Elevator']

const SearchContent = ({ filters, updateFilter, onSearch, clearFilters, isSearching, isDebouncing, mobile = false }) => (
  <div className={cn('flex flex-col gap-6', !mobile && 'lg:flex-row lg:items-end lg:gap-4')}>
    <div className={cn('flex-1', !mobile && 'lg:min-w-[300px]')}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1 mb-1.5 block">
        Location
      </label>
      <LocationInput
        value={filters.location}
        onChange={(val) => updateFilter('location', val)}
        onDebounceStateChange={() => {}}
      />
    </div>

    <div className={cn(!mobile && 'lg:w-48')}>
      <SelectField
        label="Type"
        options={propertyTypes}
        value={filters.type}
        onChange={(val) => updateFilter('type', val)}
        icon={Building2}
      />
    </div>

    <div className={cn(!mobile && 'lg:w-64')}>
      <RangeInput
        label="Price Range"
        minName="priceMin"
        maxName="priceMax"
        minValue={filters.priceMin}
        maxValue={filters.priceMax}
        onChange={updateFilter}
        prefix="$"
      />
    </div>

    {!mobile && (
      <button
        type="button"
        onClick={() => {}}
        className="p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-white hover:border-gray-300 transition-all text-gray-600 hidden lg:flex"
        title="More Filters"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    )}

    <div className={cn('flex items-center gap-3', !mobile && 'lg:mb-0.5')}>
      <button
        type="button"
        onClick={onSearch}
        disabled={isSearching || isDebouncing}
        className={cn(
          'flex-1 lg:flex-none lg:px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20',
          'hover:bg-blue-700 hover:shadow-blue-700/30 active:scale-[0.98] transition-all',
          'flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
        )}
      >
        {isSearching ? (
          <RotateCcw className="w-5 h-5 animate-spin" />
        ) : (
          <Search className="w-5 h-5" />
        )}
        <span>{isSearching ? 'Searching...' : 'Search'}</span>
      </button>

      {mobile && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  </div>
)

const AdvancedSearchBar = () => {
  const {
    filters,
    updateFilter,
    clearFilters,
    applySearch,
    getQueryObject,
    isDebouncing,
  } = useSearchFilters()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    setTimeout(() => {
      applySearch()
      setIsSearching(false)
      setIsMobileMenuOpen(false)
      console.log('API Query Object:', getQueryObject())
    }, 800)
  }

  const handleRemoveFilter = (key) => {
    if (key === 'amenities') {
      updateFilter(key, [])
    } else {
      updateFilter(key, key.includes('Min') || key.includes('Max') ? '' : 'All')
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-4 lg:p-6">
        <SearchContent
          filters={filters}
          updateFilter={updateFilter}
          onSearch={handleSearch}
          clearFilters={clearFilters}
          isSearching={isSearching}
          isDebouncing={isDebouncing}
        />

        <FilterChips
          filters={filters}
          onRemove={handleRemoveFilter}
          onClearAll={clearFilters}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-900">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold">Advanced Filters</h2>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <SearchContent
                filters={filters}
                updateFilter={updateFilter}
                onSearch={handleSearch}
                clearFilters={clearFilters}
                isSearching={isSearching}
                isDebouncing={isDebouncing}
                mobile
              />

              <div className="h-px bg-gray-100" />

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Bedrooms"
                  options={bedBathOptions}
                  value={filters.bedrooms}
                  onChange={(val) => updateFilter('bedrooms', val)}
                  icon={Bed}
                />
                <SelectField
                  label="Bathrooms"
                  options={bedBathOptions}
                  value={filters.bathrooms}
                  onChange={(val) => updateFilter('bathrooms', val)}
                  icon={Bath}
                />
              </div>

              <RangeInput
                label="Area Range"
                minName="areaMin"
                maxName="areaMax"
                minValue={filters.areaMin}
                maxValue={filters.areaMax}
                onChange={updateFilter}
                unitOptions={['Sqft', 'Marla', 'Kanal']}
                currentUnit={filters.areaUnit}
                onUnitChange={(u) => updateFilter('areaUnit', u)}
              />

              <PropertyStatusToggle
                value={filters.status}
                onChange={(val) => updateFilter('status', val)}
              />

              <MultiSelect
                label="Amenities"
                options={amenitiesOptions}
                value={filters.amenities}
                onChange={(val) => updateFilter('amenities', val)}
              />
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={handleSearch}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedSearchBar