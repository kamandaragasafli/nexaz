import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { caseStudies } from '../../data/content'
import ScrollReveal from '../ui/ScrollReveal'
import { useCopy } from '../../i18n/LanguageContext'
import { WHATSAPP_URL } from '../../lib/whatsapp'

const CaseStudyCard = ({ data, text, viewLabel }) => {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 1500 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden bg-ink-800 border border-white/5 aspect-[4/3] group rounded-sm"
        data-cursor="view"
      >
        {data.image ? (
          data.panel3d ? (
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1100px' }}>
              <div
                className="relative w-[78%] aspect-[16/10]"
                style={{
                  transform: 'rotateY(-34deg) rotateX(16deg) rotateZ(8deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg bg-[#07110c]"
                  style={{ transform: 'translateZ(-22px)' }}
                />
                <img
                  src={data.image}
                  alt=""
                  className="relative h-full w-full rounded-lg border border-white/20 object-cover object-left-top shadow-[0_28px_50px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          ) : (
            <img
              src={data.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          )
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${data.accentColor} opacity-40 transition-opacity duration-500 group-hover:opacity-80`} />
        )}
        <div className={`absolute inset-0 ${data.image && !data.panel3d ? 'bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent' : data.panel3d ? 'bg-gradient-to-t from-ink-950 via-transparent to-transparent' : ''}`} />
        <div 
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        ></div>

        {/* Normal State Front */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            {text.industry ? (
              <span className="inline-block border border-white/20 text-white/60 bg-black/20 font-mono text-xs px-3 py-1 rounded-full backdrop-blur-md">
                {text.industry}
              </span>
            ) : null}
          </div>
          <div>
            <h3 className="font-display font-medium text-4xl mb-2 tracking-tight" style={{ transform: "translateZ(30px)" }}>{data.company}</h3>
            {text.result ? (
              <p className="font-mono text-xl text-signal" style={{ transform: "translateZ(20px)" }}>{text.result}</p>
            ) : null}
          </div>
        </div>

        {/* Hover Overlay State */}
        <div className="absolute inset-0 bg-ink-950/95 p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          {text.modules ? (
            <>
              <div className="flex flex-wrap gap-2">
                {text.modules.map(tag => (
                  <span key={tag} className="font-mono text-[11px] text-white/80 bg-white/5 px-2.5 py-1 rounded-sm border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center bg-signal text-ink-950 font-display font-medium px-6 py-3 rounded-full text-sm"
                data-cursor="hover"
              >
                {text.order}
              </a>
            </>
          ) : (
            <>
              <p className="text-mist-100 text-lg leading-relaxed mb-6 font-body">
                {text.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {text.services.map(tag => (
                  <span key={tag} className="font-mono text-[10px] text-white/50 bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-2 text-signal font-mono text-sm group/btn cursor-pointer">
                <span className="group-hover/btn:underline hover:underline-offset-4">{viewLabel}</span> &rarr;
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function CaseStudies() {
  const copy = useCopy().work
  return (
    <section className="bg-ink-950 py-32" id="work">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-xs text-signal uppercase tracking-widest mb-4">{copy.eyebrow}</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">{copy.title}</h2>
          </div>
          <button className="text-mist-900 border border-white/10 hover:border-white/30 hover:text-white px-6 py-3 rounded-full text-sm transition-colors text-nowrap self-start md:self-auto" data-cursor="hover">
            {copy.all}
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.1}>
              <CaseStudyCard data={cs} text={copy.items[i]} viewLabel={copy.view} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
