import { Briefcase as Linkedin, MessageCircle as Twitter, Camera as Instagram, Facebook } from 'lucide-react'
import { useCopy } from '../../i18n/LanguageContext'

export default function Footer() {
  const t = useCopy().footer
  return (
    <footer className="bg-ink-950 border-t border-white/5 pt-24 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          {/* Col 1 */}
          <div className="col-span-1 border-r-0 md:border-r md:border-white/5 pr-8">
            <div className="group inline-block mb-6 relative" data-cursor="hover">
              <img src="/nexaz-logo.png" alt="NEXAZ" className="h-9 w-auto" />
              <div className="absolute top-1/2 left-full ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-mist-900 text-xs text-nowrap">
                {t.hover}
              </div>
            </div>
            <p className="text-mist-900 text-sm mb-8 leading-relaxed max-w-xs">
              {t.line1}<br/>{t.line2}
            </p>
            <div className="flex gap-4 text-mist-900">
              <a href="https://www.facebook.com/share/19nusrfysc/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 -ml-2 rounded-full hover:bg-white/5"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/nexaz.tech/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="col-span-1">
            <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-6">{t.services}</h4>
            <ul className="flex flex-col gap-4 text-sm text-mist-500">
              {t.serviceLinks.map((label) => (
                <li key={label}><a href="#" className="hover:text-white transition-colors" >{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="col-span-1">
            <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-6">{t.company}</h4>
            <ul className="flex flex-col gap-4 text-sm text-mist-500">
              {t.companyLinks.map((label) => (
                <li key={label}><a href="#" className="hover:text-white transition-colors" >{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div className="col-span-1">
            <h4 className="font-mono text-xs text-signal uppercase tracking-widest mb-6">{t.contact}</h4>
            <div className="flex flex-col gap-4 text-sm text-mist-500">
              <a href="mailto:nexaz.tech@gmail.com" className="hover:text-white transition-colors" data-cursor="hover">nexaz.tech</a>
              <a href="tel:+994504768843" className="hover:text-white transition-colors" data-cursor="hover">+994 50 476 88 43</a>
              <p className="mt-4 text-mist-700 leading-relaxed">
                Bakı ş xətai pr 36
              </p>
              <a href="#" className="text-signal hover:underline mt-2 inline-block" data-cursor="hover">{t.map}</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-mist-900">
          <p>© <span title="Our founding year — and still going strong." className="cursor-help hover:text-signal transition-colors">2025</span> {t.rights}</p>
          <p>{t.made} <span className="text-ember">♥</span> {t.madeIn}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">{t.privacy}</a>
            <span>·</span>
            <a href="#" className="hover:text-white">{t.terms}</a>
            <span>·</span>
            <a href="#" className="hover:text-white">{t.sitemap}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
