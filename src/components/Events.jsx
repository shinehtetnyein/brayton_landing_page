import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Events() {
  const { t } = useLanguage()

  const events = [1, 2, 3, 4].map((n) => ({
    date: t(`event${n}Date`),
    title: t(`event${n}Title`),
    desc: t(`event${n}Desc`),
    image: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
    ][n - 1],
  }))

  return (
    <section id="events" className="py-12 lg:py-16 relative bg-church-bg-alt">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mb-8">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t('eventsEyebrow')}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t('eventsHeading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-church-ink-muted max-w-[56ch]">
            {t('eventsIntro')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((ev, i) => (
            <motion.article
              key={ev.title}
              className="bg-church-surface border border-church-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-church-md hover:border-church-border-strong flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.07 }}
            >
              <img className="w-full h-48 object-cover block bg-church-bg-alt" src={ev.image} alt={ev.title} />
              <span className="mt-4 mx-5 inline-flex self-start text-xs font-bold tracking-wider text-church-cta-text bg-church-cta px-3 py-1 rounded-full">
                {ev.date}
              </span>
              <h3 className="mt-3 mx-5 font-display font-semibold text-lg text-church-ink">
                {ev.title}
              </h3>
              <p className="mt-2 mx-5 mb-5 text-sm leading-relaxed text-church-ink-muted">
                {ev.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
