import { clsx } from 'clsx'

const RangeInput = ({
  label,
  minName,
  maxName,
  minPlaceholder,
  maxPlaceholder,
  minValue,
  maxValue,
  onChange,
  prefix,
  suffix,
  unitOptions,
  currentUnit,
  onUnitChange,
}) => {
  const validateRange = (name, value) => {
    const numValue = Number(value)
    if (isNaN(numValue)) return
    onChange(name, value)
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-[240px]">
      <div className="flex justify-between items-center px-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {label}
        </label>
        {unitOptions && (
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {unitOptions.map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => onUnitChange?.(unit)}
                className={clsx(
                  'px-2 py-0.5 text-[10px] font-bold rounded-md transition-all',
                  currentUnit === unit
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                {unit}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {prefix}
            </span>
          )}
          <input
            type="number"
            placeholder={minPlaceholder || 'Min'}
            className={clsx(
              'w-full py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-all',
              'focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500',
              prefix ? 'pl-8 pr-3' : 'px-3'
            )}
            value={minValue || ''}
            onChange={(e) => validateRange(minName, e.target.value)}
          />
        </div>

        <span className="text-gray-300 text-xs font-bold">—</span>

        <div className="relative flex-1">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {prefix}
            </span>
          )}
          <input
            type="number"
            placeholder={maxPlaceholder || 'Max'}
            className={clsx(
              'w-full py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm transition-all',
              'focus:bg-white focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500',
              prefix ? 'pl-8 pr-3' : 'px-3'
            )}
            value={maxValue || ''}
            onChange={(e) => validateRange(maxName, e.target.value)}
          />
        </div>
      </div>

      {minValue && maxValue && Number(minValue) > Number(maxValue) && (
        <p className="text-[10px] text-red-500 font-medium animate-pulse">
          Min should be less than Max
        </p>
      )}
    </div>
  )
}

export default RangeInput