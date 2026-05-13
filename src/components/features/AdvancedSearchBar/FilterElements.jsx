import React from 'react';
import { clsx } from 'clsx';

export const PropertyStatusToggle = ({ value, onChange }) => {
  const statuses = ['All', 'Sale', 'Rent', 'Under Construction', 'Ready'];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
        Property Status
      </label>
      <div className="flex p-1 bg-gray-100 rounded-xl">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onChange(status)}
            className={clsx(
              "flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all",
              value === status
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export const FilterChips = ({ filters, onRemove, onClearAll }) => {
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (!value || value === 'All') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (key === 'areaUnit') return false; // Don't show unit as a chip
    return true;
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">
        Active Filters ({activeFilters.length}):
      </span>
      {activeFilters.map(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        const displayLabel = key.replace(/([A-Z])/g, ' $1').trim();

        return (
          <div
            key={key}
            className="group flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 pl-3 pr-2 py-1.5 rounded-full text-xs font-semibold transition-all hover:border-blue-200 hover:bg-blue-100/50"
          >
            <span className="opacity-60">{displayLabel}:</span>
            <span>{displayValue}</span>
            <button
              type="button"
              onClick={() => onRemove(key)}
              className="p-0.5 rounded-full hover:bg-blue-200 transition-colors"
              aria-label={`Remove ${displayLabel} filter`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline px-2 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
};

import { X } from 'lucide-react';
