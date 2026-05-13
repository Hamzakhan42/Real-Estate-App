import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const INITIAL_STATE = {
  location: '',
  type: 'All',
  priceMin: '',
  priceMax: '',
  bedrooms: 'All',
  bathrooms: 'All',
  areaMin: '',
  areaMax: '',
  areaUnit: 'Sqft',
  status: 'All',
  amenities: [],
};

/**
 * Custom hook to manage search filters and sync with URL query parameters.
 */
export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => {
    // Initialize state from URL params
    const params = Object.fromEntries(searchParams.entries());
    return {
      ...INITIAL_STATE,
      ...params,
      amenities: params.amenities ? params.amenities.split(',') : [],
    };
  });

  const [isDebouncing, setIsDebouncing] = useState(false);

  // Sync state to URL
  const updateUrl = useCallback((newFilters) => {
    const params = {};
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== INITIAL_STATE[key]) {
        if (Array.isArray(value)) {
          if (value.length > 0) params[key] = value.join(',');
        } else {
          params[key] = value;
        }
      }
    });
    setSearchParams(params);
  }, [setSearchParams]);

  const updateFilter = (key, value) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      return next;
    });
  };

  const clearFilters = () => {
    setFilters(INITIAL_STATE);
    setSearchParams({});
  };

  const applySearch = () => {
    updateUrl(filters);
  };

  // Export clean query object for API calls
  const getQueryObject = () => {
    const query = { ...filters };
    // Numeric conversions and cleaning
    if (query.priceMin) query.priceMin = Number(query.priceMin);
    if (query.priceMax) query.priceMax = Number(query.priceMax);
    if (query.areaMin) query.areaMin = Number(query.areaMin);
    if (query.areaMax) query.areaMax = Number(query.areaMax);
    
    // Remove "All" defaults for API
    Object.keys(query).forEach(key => {
      if (query[key] === 'All') delete query[key];
    });

    return query;
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    applySearch,
    getQueryObject,
    isDebouncing,
    setIsDebouncing,
  };
};
