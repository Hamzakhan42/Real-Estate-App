import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

const MOCK_SUGGESTIONS = [
  'DHA Phase 6, Lahore',
  'Bahria Town, Islamabad',
  'Gulberg, Lahore',
  'Emaar Canyon Views, Islamabad',
  'Clifton, Karachi',
  'Defense, Karachi',
];

const LocationInput = ({ value, onChange, onDebounceStateChange }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Debounce logic
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      onDebounceStateChange?.(true);
      
      // Mock API call
      setTimeout(() => {
        const filtered = MOCK_SUGGESTIONS.filter(s => 
          s.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setLoading(false);
        onDebounceStateChange?.(false);
      }, 500);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onDebounceStateChange]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    onChange(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 min-w-[200px]" ref={containerRef}>
      <label htmlFor="location" className="sr-only">Location</label>
      <div className="relative group">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          id="location"
          type="text"
          className={clsx(
            "w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
            "transition-all duration-200 text-gray-700 placeholder:text-gray-400"
          )}
          placeholder="Enter location, area or city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-300" />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query.length > 0 || suggestions.length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-700 transition-colors flex items-center gap-2"
                    onClick={() => handleSelect(suggestion)}
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{suggestion}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : !loading && query.length > 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
