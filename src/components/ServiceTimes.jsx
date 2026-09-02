import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function ServiceTimes() {
  const { t } = useLanguage()

  const services = [1, 2, 3, 4, 5].map((n) => ({
    day: t(`service${n}Day`),
    name: t(`service${n}Name`),
    time: t(`service${n}Time`),
    lang: t(`service${n}Lang`),
  }))

  return (
    <section id="services" className="py-12 lg:py-16 relative bg-church-bg">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mb-8">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t('servicesEyebrow')}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t('servicesHeading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-church-ink-muted max-w-[56ch]">
            {t('servicesIntro')}
          </p>
        </div>

        <div className="border-t border-church-border">
          {services.map((s, i) => (
            <motion.div
              key={`${s.day}-${s.time}-${i}`}
              className="grid grid-cols-2 sm:grid-cols-[130px_1.6fr_1fr_auto] items-center gap-3 sm:gap-5 py-5 px-3 border-b border-church-border transition-colors hover:bg-church-bg-alt/70 rounded-lg"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            >
              <span className="font-display font-semibold text-base sm:text-lg text-church-ink">
                {s.day}
              </span>
              <span className="font-semibold text-sm sm:text-base text-church-ink">
                {s.name}
              </span>
              <span className="text-xs sm:text-sm text-church-ink-muted">
                {s.lang}
              </span>
              <span className="font-display text-base sm:text-lg font-semibold text-church-accent col-span-2 sm:col-span-1 text-left sm:text-right whitespace-nowrap">
                {s.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
