import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Welcome() {
  const { t } = useLanguage()

  return (
    <section id="welcome" className="py-12 lg:py-16 relative bg-church-bg">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-12 items-start">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full max-w-[320px] lg:max-w-none mx-auto rounded-3xl overflow-hidden border border-church-border shadow-church-md aspect-square bg-church-surface">
            <div className="w-full h-full" aria-hidden="true">
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <rect width="200" height="200" fill="var(--color-accent-tint)" />
                <circle cx="100" cy="82" r="38" fill="var(--color-accent)" opacity="0.85" />
                <path d="M40,196 C40,150 64,128 100,128 C136,128 160,150 160,196 Z" fill="var(--color-accent)" opacity="0.85" />
              </svg>
            </div>
          </div>
          
          <blockquote className="p-6 sm:p-7 bg-church-accent-tint rounded-2xl border-l-4 border-church-accent">
            <Quote size={22} className="text-church-accent mb-2" />
            <p className="font-display text-lg leading-relaxed text-church-ink">{t('welcomeQuote')}</p>
            <footer className="flex flex-col mt-4 not-italic">
              <span className="font-bold text-sm text-church-ink">{t('welcomePastorName')}</span>
              <span className="text-xs sm:text-[13px] text-church-ink-muted mt-0.5">{t('welcomePastorTitle')}</span>
            </footer>
          </blockquote>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t('welcomeEyebrow')}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t('welcomeHeading')}
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-church-ink-muted max-w-[62ch]">
            {t('welcomeBody1')}
          </p>
          <p className="mt-4 text-[16.5px] leading-relaxed text-church-ink-muted max-w-[62ch]">
            {t('welcomeBody2')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
