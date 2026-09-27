import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import { useCopy } from '../../i18n/LanguageContext'

export default function StatsSection() {
  const labels = useCopy().stats
  const stats = [
    { num: 48, suffix: '+' },
    { num: 12, prefix: '$', suffix: 'M' },
    { num: 98, suffix: '%' },
    { num: 4.9, suffix: '★', decimals: 1 },
    { num: 6 },
    { num: 3 },
  ]

  return (
    <section className="bg-signal py-24 md:py-32 w-full text-ink-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-y-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="flex flex-col items-start xl:items-center">
              <div className="font-display text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter tabular-nums">
                <AnimatedCounter 
                  end={stat.num} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals} 
                />
              </div>
              <p className="font-mono text-xs md:text-sm uppercase tracking-widest mt-2 md:mt-4 opacity-80 font-semibold text-wrap">
                {labels[i]}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
