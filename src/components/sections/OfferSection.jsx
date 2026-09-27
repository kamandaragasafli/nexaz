import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { useCopy } from '../../i18n/LanguageContext'

export default function OfferSection() {
  const copy = useCopy().offer

  return (
    <section className="bg-ink-950 py-32 border-t border-white/5" id="offer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="font-mono text-xs text-signal uppercase tracking-widest mb-4">{copy.eyebrow}</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-16">{copy.title}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.items.map((item, i) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.Circle
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-ink-900 border border-white/5 p-8 md:p-10 hover:border-signal/40 transition-colors duration-500"
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-mist-900">0{i + 1}</span>
                  <Icon className="text-signal" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-medium mb-4">{item.title}</h3>
                <p className="text-mist-900 text-base leading-relaxed max-w-lg">{item.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
