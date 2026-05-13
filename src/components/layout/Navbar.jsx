import { useEffect, useRef, useState } from 'react'
import { Home, Menu, X } from 'lucide-react'

import { APP_NAME } from '../../utils/constants'
import { cn } from '../../utils/cn'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Buy', href: '#buy' },
  { label: 'Rent', href: '#rent' },
  { label: 'Agents', href: '#agents' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }

    const onPointerDown = (e) => {
      if (!mobileOpen) return
      if (!panelRef.current) return
      if (panelRef.current.contains(e.target)) return
      setMobileOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'border-b transition-all duration-300',
          isScrolled
            ? 'border-white/10 bg-slate-950/40 backdrop-blur'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-2 text-white"
            aria-label="Go to home"
            onClick={() => setActive('Home')}
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-wide">
              {APP_NAME}
            </span>
          </a>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={cn(
                  'group relative text-sm font-medium text-white/80 transition-colors hover:text-white',
                  active === link.label && 'text-white',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-white/90 transition-all duration-300 group-hover:w-full',
                    active === link.label && 'w-full',
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#featured"
              className="hidden rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 sm:inline-flex"
            >
              Explore
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-white/90 transition hover:bg-white/10 md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div
          ref={panelRef}
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-slate-950/50 p-3 backdrop-blur">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActive(link.label)
                      setMobileOpen(false)
                    }}
                    className={cn(
                      'rounded-xl px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white',
                      active === link.label && 'bg-white/10 text-white',
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
