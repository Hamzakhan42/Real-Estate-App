import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, X } from 'lucide-react'
import { clsx } from 'clsx'

export const SelectField = ({ label, options, value, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-1.5" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-all',
            'hover:bg-white hover:border-gray-300 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500',
            isOpen && 'bg-white border-blue-500 ring-2 ring-blue-500/10'
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {Icon && <Icon className="w-4 h-4 text-gray-400" />}
            <span className={clsx(value === 'All' ? 'text-gray-400' : 'text-gray-700 font-medium')}>
              {value}
            </span>
          </div>
          <ChevronDown className={clsx('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between',
                  value === option ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                )}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
              >
                {option}
                {value === option && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const MultiSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (option) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option]
    onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-1.5" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
        {label}
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'w-full min-h-[44px] flex items-center justify-between gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm cursor-pointer transition-all',
            'hover:bg-white hover:border-gray-300',
            isOpen && 'bg-white border-blue-500 ring-2 ring-blue-500/10'
          )}
        >
          <div className="flex flex-wrap gap-1.5 overflow-hidden">
            {value.length === 0 ? (
              <span className="text-gray-400 py-0.5">Select amenities...</span>
            ) : (
              value.map((v) => (
                <span key={v} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                  {v}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-blue-900"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleOption(v)
                    }}
                  />
                </span>
              ))
            )}
          </div>
          <ChevronDown className={clsx('w-4 h-4 text-gray-400 flex-shrink-0 transition-transform', isOpen && 'rotate-180')} />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between',
                  value.includes(option) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                )}
                onClick={() => toggleOption(option)}
              >
                {option}
                {value.includes(option) && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}