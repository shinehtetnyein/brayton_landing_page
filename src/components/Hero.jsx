import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="relative bg-[radial-gradient(120%_140%_at_15%_0%,#2A3338_0%,#151A1E_48%,#0A0D0F_100%)] text-[#F9F9FB] overflow-hidden pt-6 pb-12 lg:py-16">
      {/* Subtle lighting backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_82%_18%,rgba(92,107,115,0.22)_0%,transparent_70%),radial-gradient(45%_40%_at_8%_85%,rgba(0,0,0,0.35)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1180px] mx-auto px-5 sm:px-7 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-8 lg:gap-12 min-h-[480px]">
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-[#A4B4BE] before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-[#A4B4BE]"
          >
            {t('bannerEyebrow')}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 font-display font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#F9F9FB] leading-[1.1] tracking-tight"
          >
            {t('bannerHeadlineLine1')}
            <br />
            <span className="italic text-[#CCD7DD] font-medium">{t('bannerHeadlineLine2')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-base sm:text-lg leading-relaxed text-[#F9F9FB]/80 max-w-[46ch]"
          >
            {t('bannerSubtext')}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mt-8">
            <Link
              to="/#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white text-black hover:bg-zinc-200 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              {t('bannerCtaPrimary')} <ArrowRight size={17} />
            </Link>
            <Link
              to="/#sermons"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-transparent text-[#F9F9FB] border border-[#F9F9FB]/30 hover:bg-[#F9F9FB]/10 hover:border-[#F9F9FB] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlayCircle size={18} /> {t('bannerCtaSecondary')}
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="inline-flex items-center justify-center lg:justify-start gap-2.5 mt-7 text-sm text-[#F9F9FB]/70"
          >
            <Clock3 size={16} />
            <span>{t('bannerServiceNote')}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center order-first lg:order-last"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <video
            src="/media1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[500px] aspect-square rounded-2xl sm:rounded-3xl object-cover block bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10"
          />
        </motion.div>
      </div>
    </section>
  )
}
