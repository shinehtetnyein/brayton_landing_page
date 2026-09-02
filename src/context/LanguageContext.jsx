import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem('brayton-lang')
  if (saved === 'en' || saved === 'my') return saved
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang === 'my' ? 'my' : 'en')
    document.documentElement.setAttribute('data-lang', lang)
    window.localStorage.setItem('brayton-lang', lang)
  }, [lang])

  const toggleLanguage = () => setLang((l) => (l === 'en' ? 'my' : 'en'))

  const t = (key) => {
    const dict = translations[lang] || translations.en
    return dict[key] ?? translations.en[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
