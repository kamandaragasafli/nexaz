import { createContext, useContext, useEffect, useState } from 'react'
import { messages } from './messages'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('nexus-lang')
    return saved === 'az' ? 'az' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('nexus-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export function useCopy() {
  const { lang } = useLanguage()
  return messages[lang]
}
