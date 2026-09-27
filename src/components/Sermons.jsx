import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Calendar, Youtube } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import {
  getLatestPlaylistVideos,
  DEFAULT_SERMON_VIDEOS,
  PLAYLIST_URL,
} from '../services/youtubeService.js'

function formatDate(dateStr, lang) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat(lang === 'my' ? 'my-MM' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d)
  } catch {
    return ''
  }
}

export default function Sermons() {
  const { t, lang } = useLanguage()
  const [videos, setVideos] = useState(DEFAULT_SERMON_VIDEOS || [])
  const [selectedId, setSelectedId] = useState(DEFAULT_SERMON_VIDEOS?.[0]?.id || '')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadLatestVideos() {
      try {
        setIsLoading(true)
        const fetchedVideos = await getLatestPlaylistVideos(3)
        if (isMounted && Array.isArray(fetchedVideos) && fetchedVideos.length > 0) {
          setVideos(fetchedVideos)
          setSelectedId((prev) => {
            return fetchedVideos.some((v) => v.id === prev) ? prev : fetchedVideos[0].id
          })
        }
      } catch (err) {
        console.error('Failed to load playlist sermons:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadLatestVideos()

    return () => {
      isMounted = false
    }
  }, [])

  const featuredVideo = videos.find((v) => v.id === selectedId) || videos[0] || null
  const cardVideos = featuredVideo ? videos.filter((v) => v.id !== featuredVideo.id).slice(0, 2) : []

  return (
    <section id="sermons" className="py-12 lg:py-16 relative bg-church-bg scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="max-w-[640px]">
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

          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-church-accent hover:text-church-ink transition-colors group self-start sm:self-end"
          >
            <Youtube size={17} className="text-[#FF0000] group-hover:scale-110 transition-transform" />
            <span>{t('sermonsPlaylistLabel') || 'YouTube Playlist'}</span>
            <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
          </a>
        </div>

        {/* Featured Video (Most Recent Sermon) */}
        {featuredVideo ? (
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

            {/* Featured Video Info Bar */}
            <div className="mt-4 px-1 sm:px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-church-accent/10 text-church-accent border border-church-accent/20">
                    {t('sermonsLatestBadge') || 'Latest Service'}
                  </span>
                  {featuredVideo.publishedAt && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-church-ink-muted">
                      <Calendar size={13} className="opacity-75" />
                      {formatDate(featuredVideo.publishedAt, lang)}
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 text-lg sm:text-xl font-display font-semibold text-church-ink truncate">
                  {featuredVideo.title}
                </h3>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${featuredVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-church-ink hover:text-church-accent transition-colors self-start sm:self-center shrink-0"
              >
                <span>{t('sermonsWatchOnYoutube') || 'Watch on YouTube'}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-[1100px] mx-auto aspect-video rounded-2xl bg-church-surface animate-pulse border border-church-border" />
        )}

        {/* Secondary Videos Grid */}
        {cardVideos.length > 0 && (
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cardVideos.map((sermon, index) => (
              <motion.div
                key={`${sermon.id}-${index}`}
                className="flex flex-col gap-3 group"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="aspect-video overflow-hidden rounded-2xl bg-black border border-white/10 shadow-church-sm relative">
                  <iframe
                    className="w-full h-full border-0 block bg-black"
                    src={`https://www.youtube.com/embed/${sermon.id}?rel=0&modestbranding=1`}
                    title={sermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="flex items-start justify-between gap-3 px-1">
                  <div className="min-w-0 flex-1">
                    {sermon.publishedAt && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-church-ink-muted mb-1">
                        <Calendar size={12} className="opacity-75" />
                        {formatDate(sermon.publishedAt, lang)}
                      </span>
                    )}
                    <h4 className="text-sm sm:text-base font-display font-medium text-church-ink line-clamp-2">
                      {sermon.title}
                    </h4>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${sermon.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t('sermonsWatchOnYoutube') || 'Watch on YouTube'}
                    className="p-1.5 rounded-lg text-church-ink-muted hover:text-church-ink hover:bg-church-surface-raised transition-colors shrink-0"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Sermons Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-church-border-strong text-church-ink hover:border-church-cta hover:bg-church-cta hover:text-church-cta-text transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-sm"
          >
            <Youtube size={17} className="text-[#FF0000]" />
            <span>{t('sermonsCta')}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
