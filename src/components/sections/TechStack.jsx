import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { useCopy } from '../../i18n/LanguageContext'

export default function TechStack() {
  const copy = useCopy().tech
  const items = [
    ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Three.js'],
    ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    ['AWS', 'Vercel', 'Docker', 'Kubernetes'],
    ['Figma', 'Adobe Suite', 'Spline', 'Rive'],
    ['OpenAI', 'Langchain', 'Pinecone', 'HuggingFace'],
  ]
  const stack = copy.cats.map((cat, i) => ({ cat, items: items[i] }))

  return (
    <section className="bg-ink-900 py-32 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">{copy.title}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {stack.map((category, i) => (
            <div key={category.cat} className="flex flex-col">
              <h3 className="font-mono text-xs text-signal uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                {category.cat}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ scale: 1.05, backgroundColor: '#e8ff47', color: '#04040a', borderColor: '#e8ff47' }}
                    className="font-mono text-xs md:text-sm px-4 py-2 rounded-full border border-white/10 text-mist-500 cursor-default transition-colors"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
