import { Check } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import { WHATSAPP_URL } from '../../lib/whatsapp'
import ScrollReveal from '../ui/ScrollReveal'
import { useCopy } from '../../i18n/LanguageContext'

const visuals = [
  { btnClass: 'bg-signal text-ink-950 hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]', borderClass: 'border-white/10' },
  { btnClass: 'bg-signal text-ink-950 hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]', borderClass: 'border-signal/50', popular: true },
  { btnClass: 'border border-ember text-ember hover:bg-ember hover:text-ink-950', borderClass: 'border-ember/30' },
]

export default function PricingSection() {
  const copy = useCopy().pricing
  const plans = copy.plans.map((plan, i) => ({ ...plan, ...visuals[i] }))

  return (
    <section className="bg-ink-950 py-32" id="pricing">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="text-center mb-20 md:mb-24">
          <p className="font-mono text-xs text-signal uppercase tracking-widest mb-4">{copy.eyebrow}</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-6">{copy.title}<br/>{copy.title2}</h2>
          <p className="text-mist-900 max-w-lg mx-auto">{copy.body}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div 
                className={`relative bg-ink-900 border ${plan.borderClass} p-8 md:p-10 rounded-sm flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${plan.popular ? 'scale-100 md:scale-105 z-10 shadow-2xl' : 'z-0'}`}
                data-cursor="hover"
              >
                {plan.popular && (
                  <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="bg-signal/10 text-signal border border-signal/30 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      {copy.popular}
                    </span>
                  </div>
                )}
                
                <h3 className="font-display text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="font-display text-5xl font-bold mb-4">{plan.price}</div>
                <p className="font-mono text-xs text-mist-700 mb-8 pb-8 border-b border-white/5">{plan.desc}</p>
                
                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-3">
                      <Check className="text-signal mt-1 shrink-0" size={16} strokeWidth={3} />
                      <span className="text-sm text-mist-500">{feat}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 mt-4 pt-4 border-t border-white/5 border-dashed">
                    <span className="text-signal mt-1 shrink-0 font-mono text-[10px]">&rarr;</span>
                    <span className="text-xs font-mono text-mist-700">{copy.timeline}: {plan.timeline}</span>
                  </li>
                </ul>

                <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-full font-display font-medium text-lg transition-all ${plan.btnClass}`}>
                  {plan.btn}
                </MagneticButton>
                
                <p className="font-mono text-[10px] text-mist-900 text-center mt-6">
                  {copy.note}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
