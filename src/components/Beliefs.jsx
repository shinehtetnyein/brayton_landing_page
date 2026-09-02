import { motion } from 'framer-motion'
import { BookOpen, Droplets, Users, Landmark, Feather, Globe2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

const ICONS = [BookOpen, Droplets, Users, Landmark, Feather, Globe2]

export default function Beliefs() {
  const { t } = useLanguage()

  const items = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`belief${n}Title`),
    desc: t(`belief${n}Desc`),
    Icon: ICONS[n - 1],
  }))

  return (
    <section id="beliefs" className="py-12 lg:py-16 relative bg-church-bg-alt">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mx-auto mb-8 text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t('beliefsEyebrow')}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t('beliefsHeading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-church-ink-muted max-w-[56ch] mx-auto">
            {t('beliefsIntro')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((belief, i) => (
            <motion.article
              key={belief.title}
              className="p-7 sm:p-8 bg-church-surface border border-church-border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-church-md hover:border-church-border-strong flex flex-col items-start"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-church-accent-tint text-church-accent shrink-0">
                <belief.Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-church-ink mt-5">
                {belief.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-church-ink-muted">
                {belief.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
