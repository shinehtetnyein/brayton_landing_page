import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function ScriptureBand() {
  const { t } = useLanguage()

  return (
    <section className="py-12 lg:py-16 relative bg-[linear-gradient(135deg,#1A2227_0%,#394B54_48%,#5C6B73_100%)] text-[#F9F9FB]">
      <div className="max-w-[780px] mx-auto px-5 sm:px-7 text-center">
        <motion.p
          className="font-display text-2xl sm:text-3xl md:text-4xl italic leading-relaxed text-[#F9F9FB]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('verseText')}
        </motion.p>
        <motion.span
          className="inline-block mt-6 text-xs sm:text-sm font-bold tracking-[0.08em] uppercase text-[#F9F9FB]/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {t('verseRef')}
        </motion.span>
      </div>
    </section>
  )
}
