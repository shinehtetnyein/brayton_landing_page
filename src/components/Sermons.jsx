import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

const FALLBACK_VIDEOS = [
  { id: 'ce2s2iLQ2qY', title: 'The God Who Sees Us' },
  { id: 'pY1-MowUP-Q', title: 'A Table Wide Enough' },
  { id: 'A_P6r09K7XI', title: 'Rooted, Not Rootless' },
]

export default function Sermons() {
  const { t } = useLanguage()

  const featuredVideo = FALLBACK_VIDEOS[0]
  const cardVideo = FALLBACK_VIDEOS

  return (
    <section id="sermons" className="py-12 lg:py-16 relative bg-church-bg">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mb-8">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t('sermonsEyebrow')}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t('sermonsHeading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-church-ink-muted max-w-[56ch]">
            {t('sermonsIntro')}
          </p>
        </div>

        <motion.div
          className="w-full max-w-[1100px] mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-[0_22px_46px_rgba(14,18,20,0.18)] border border-white/10">
            <iframe
              className="w-full h-full border-0 block bg-black"
              src={`https://www.youtube.com/embed/${featuredVideo.id}?rel=0&modestbranding=1`}
              title={featuredVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardVideo.slice(1, 3).map((sermon, index) => (
            <motion.div
              key={`${sermon.id}-${index}`}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="aspect-video overflow-hidden rounded-2xl bg-black border border-white/10 shadow-church-sm">
                <iframe
                  className="w-full h-full border-0 block bg-black"
                  src={`https://www.youtube.com/embed/${sermon.id}?rel=0&modestbranding=1`}
                  title={sermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-church-border-strong text-church-ink hover:border-church-cta hover:bg-church-cta hover:text-church-cta-text transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            {t('sermonsCta')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
