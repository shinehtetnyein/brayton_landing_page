import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Languages } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const NAV_ITEMS = [
  { key: 'navAbout', to: '/#welcome' },
  { key: 'navBeliefs', to: '/#beliefs' },
  { key: 'navServices', to: '/#services' },
  { key: 'navEvents', to: '/#events' },
  { key: 'navSermons', to: '/#sermons' },
  { key: 'navContact', to: '/#contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLanguage, t } = useLanguage()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elementId = location.hash.replace('#', '')
    if (!elementId) {
      return
    }

    const target = document.getElementById(elementId)
    if (!target) {
      return
    }

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-church-surface/90 backdrop-blur-md border-b border-church-border shadow-church-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="inline-flex items-center gap-3 text-church-ink no-underline group" onClick={closeMenu}>
          <span className="shrink-0">
            <img
              src="/brayton_logo.jpg"
              alt="Brayton Church logo"
              className="w-11 h-11 object-fit block rounded-full transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display font-semibold text-lg text-church-ink tracking-tight">{t('churchName')}</span>
            <span className="text-[11px] text-church-ink-muted tracking-wider hidden xs:block">{t('churchTag')}</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              onClick={closeMenu}
              className="text-[14.5px] font-medium text-church-ink-muted hover:text-church-ink transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-church-cta after:transition-all after:duration-300 hover:after:w-full"
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        {/* Actions & Toggles */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-church-border bg-church-surface text-church-ink text-xs font-bold hover:border-church-border-strong hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-xs"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            title={lang === 'en' ? 'Myanmar' : 'English'}
          >
            <Languages size={15} strokeWidth={2} />
            <span>{lang === 'en' ? 'EN' : 'MY'}</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-church-border bg-church-surface text-church-ink hover:border-church-border-strong hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-xs"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex"
              >
                {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link
            to="/#contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full font-semibold text-sm bg-church-cta text-church-cta-text hover:bg-church-cta-hover transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            onClick={closeMenu}
          >
            {t('navVisit')}
          </Link>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-church-border bg-church-surface text-church-ink hover:border-church-border-strong cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden overflow-hidden border-t border-church-border bg-church-surface shadow-church-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-[1180px] mx-auto px-6 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.to}
                  onClick={closeMenu}
                  className="text-church-ink font-medium text-base py-3 border-b border-church-border/50 hover:text-church-accent transition-colors"
                >
                  {t(item.key)}
                </NavLink>
              ))}
              <Link
                to="/#contact"
                className="mt-4 inline-flex w-fit items-center justify-center px-6 py-3 rounded-full font-semibold text-sm bg-church-cta text-church-cta-text hover:bg-church-cta-hover transition-all"
                onClick={closeMenu}
              >
                {t('navVisit')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
