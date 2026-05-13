import { useMemo } from 'react'

import { cn } from '../../utils/cn'
import { properties } from '../../utils/mockData'

const stripTicks = (url) => url?.replaceAll('`', '')

function PropertyCard({ item }) {
  return (
    <article className="w-72 shrink-0 sm:w-80">
      <div className="group rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="overflow-hidden rounded-xl">
          <img
            src={stripTicks(item.image)}
            alt={item.name}
            loading="lazy"
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{item.location}</p>
            </div>
            <span className="shrink-0 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              {item.price}
            </span>
          </div>

          <button
            type="button"
            aria-label={`View details for ${item.name}`}
            className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900/40"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedApartmentsMarquee() {
  const items = useMemo(() => properties, [])
  const loop = useMemo(() => [...items, ...items], [items])

  return (
    <section id="featured" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Featured Apartments
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Discover hand-picked apartments in top locations with transparent
              pricing and modern finishes.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            className={cn(
              'group flex w-[200%] gap-6 will-change-transform',
              'animate-marquee',
              'hover:[animation-play-state:paused]',
            )}
            role="list"
            aria-label="Auto-scrolling apartment gallery"
          >
            {loop.map((p, idx) => (
              <div key={`${p.id}-${idx}`} role="listitem">
                <PropertyCard item={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

