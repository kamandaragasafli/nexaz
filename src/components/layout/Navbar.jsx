import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { useCopy, useLanguage } from '../../i18n/LanguageContext'
import { WHATSAPP_URL } from '../../lib/whatsapp'
import { Menu, X, Camera as Instagram, Briefcase as Linkedin, MessageCircle as Twitter, Palette as Dribbble } from 'lucide-react'

function LanguageSwitch({ lang, setLang, label, className = '' }) {
  return (
    <div
      className={`flex items-center rounded-full border border-white/10 bg-white/5 p-1 ${className}`}
      role="group"
      aria-label={label}
    >
      {['en', 'az'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider transition-colors ${
            lang === code ? 'bg-signal text-ink-950' : 'text-mist-900 hover:text-white'
          }`}
          data-cursor="hover"
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { lang, setLang } = useLanguage()
  const { links, cta, language } = useCopy().nav

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80)
  })

  const socials = [<Linkedin key="ln"/>, <Twitter key="tw"/>, <Instagram key="ig"/>, <Dribbble key="dr"/>]

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl bg-ink-950/80 border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <a href="#" className="z-50 shrink-0" aria-label="NEXAZ">
            <img src="/nexaz-logo.png" alt="NEXAZ" className="h-7 sm:h-8 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a 
                key={link.id} 
                href={link.id === 'contact' ? WHATSAPP_URL : `#${link.id}`}
                target={link.id === 'contact' ? '_blank' : undefined}
                rel={link.id === 'contact' ? 'noopener noreferrer' : undefined}
                className="font-body text-sm text-mist-900 hover:text-white transition-colors relative group"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] bg-signal w-0 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitch lang={lang} setLang={setLang} label={language} />
            <MagneticButton 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-ember text-ember text-sm hover:bg-ember hover:text-white transition-colors"
              data-cursor="hover"
            >
              {cta}
            </MagneticButton>
          </div>

          <button 
            className="md:hidden z-50 text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-900 z-40 flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col gap-6 mt-20">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.id === 'contact' ? WHATSAPP_URL : `#${link.id}`}
                  target={link.id === 'contact' ? '_blank' : undefined}
                  rel={link.id === 'contact' ? 'noopener noreferrer' : undefined}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-5xl sm:text-6xl text-white hover:text-signal transition-colors leading-tight"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <LanguageSwitch lang={lang} setLang={setLang} label={language} className="mt-4 w-fit" />
            </nav>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 left-6 flex gap-6 text-mist-900"
            >
              {socials.map((icon, i) => (
                <a key={i} href="#" className="hover:text-white">{icon}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
