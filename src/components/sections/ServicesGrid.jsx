import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { services } from '../../data/content'
import ScrollReveal from '../ui/ScrollReveal'
import { useCopy } from '../../i18n/LanguageContext'

export default function ServicesGrid() {
  const copy = useCopy().services
  return (
    <section className="bg-ink-900 py-32 relative" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <ScrollReveal delay={0.1}>
          <p className="font-mono text-xs text-signal uppercase tracking-widest mb-4">{copy.eyebrow}</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-16 tracking-tight">{copy.title}<br/>{copy.title2}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(280px,auto)]">
          {services.map((service, i) => {
            const text = copy.items[i]
            const IconComponent = LucideIcons[service.icon] || LucideIcons.Circle
            const isLarge = service.span === 'col-span-2' || service.span === 'col-span-3'
            const spanClass = {
              'col-span-2': 'col-span-1 md:col-span-2',
              'col-span-3': 'col-span-1 md:col-span-2 lg:col-span-3',
            }[service.span] || 'col-span-1'
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`${spanClass} min-w-0 bg-ink-800 border border-white/5 p-6 sm:p-8 relative overflow-hidden group hover:border-signal/40 md:hover:scale-[1.01] transition-all duration-500 hover:bg-ink-800/80 flex flex-col justify-between`}
                data-cursor="hover"
              >
                {/* Background glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-8">
                  <div className="flex justify-between items-start w-full mb-8">
                    <span className="font-mono text-xs text-mist-900">{service.number}</span>
                    <div className="text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 className={`font-display font-medium ${isLarge ? 'text-3xl lg:text-4xl' : 'text-2xl mt-4'} mb-3`}>
                    {text.title}
                  </h3>
                  <p className="text-mist-900 text-sm leading-relaxed max-w-sm">
                    {text.desc}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {text.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] md:text-xs text-mist-700 bg-ink-900 border border-white/10 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover arrow slide-in */}
                <div className="absolute right-8 bottom-8 hidden md:flex items-center gap-2 text-signal font-mono text-sm translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="hidden sm:inline">{copy.explore}</span> &rarr;
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
