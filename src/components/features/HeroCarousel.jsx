import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useAutoPlay from '../../hooks/useAutoPlay'
import { cn } from '../../utils/cn'
import { stripTicks } from '../../utils/format'
import { heroSlides } from '../../utils/mockData'

export default function HeroCarousel() {
  const slides = useMemo(
    () => heroSlides.map((s) => ({ ...s, image: stripTicks(s.image) })),
    [],
  )

  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)

  const goTo = (i) => {
    const next = (i + slides.length) % slides.length
    setIndex(next)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  useAutoPlay(
    4000,
    () => {
      setIndex((i) => (i + 1) % slides.length)
    },
    isPaused,
  )

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Real estate hero carousel"
    >
      <div className="relative h-[60vh] md:h-[75vh]">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className="relative h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />

              <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                    {slide.subtitle}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href="#featured"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/70"
                    >
                      {slide.cta}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all duration-300',
                i === index ? 'bg-white w-7' : 'bg-white/50 hover:bg-white/70',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}