import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Check,
  ArrowUp,
  Download,
  Video,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getEventContent } from '../data/EventContent.js'

export default function EventDetails({ selectedId = 1, onSelectEvent, onBackToEvents }) {
  const { lang, t } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Current active event detail content
  const activeEvent = getEventContent(selectedId, lang) || getEventContent(1, lang)

  // Event titles for the switcher tabs
  const eventTabs = [1, 2, 3, 4].map((id) => {
    const data = getEventContent(id, lang)
    return {
      id,
      name: data?.name || t(`event${id}Title`),
      date: t(`event${id}Date`),
    }
  })

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#event-details`
    const shareData = {
      title: `${activeEvent.name} - ${t('churchName')}`,
      text: activeEvent.purpose,
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // User cancelled or unsupported; fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback if clipboard API is unavailable
    }
  }

  const handleScrollToSection = (targetId) => {
    const el = document.getElementById(targetId.replace('#', ''))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="event-details"
      className="py-12 lg:py-20 bg-church-bg border-t border-church-border relative scroll-mt-20"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        {/* Section Header & Return Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
                {t('eventDetailsEyebrow')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-church-accent-tint text-church-accent-deep border border-church-border">
                {t('eventSelectedBadge')} #{selectedId}
              </span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl leading-tight text-church-ink mt-2.5 tracking-tight">
              {t('eventDetailsHeading')}
            </h2>
            <p className="mt-2.5 text-base sm:text-lg text-church-ink-muted max-w-[62ch]">
              {t('eventDetailsIntro')}
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToEvents}
            className="inline-flex items-center gap-2 text-sm font-medium text-church-ink-muted hover:text-church-ink px-4 py-2 rounded-full border border-church-border bg-church-surface hover:border-church-border-strong hover:shadow-xs transition-all w-fit cursor-pointer group"
          >
            <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
            <span>{t('eventBackToAll')}</span>
          </button>
        </div>

        {/* Quick Event Switcher Tabs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-church-ink-muted">
              {t('eventBrowseAll')}:
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {eventTabs.map((tab) => {
              const isActive = tab.id === selectedId
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectEvent(tab.id)}
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-church-cta text-black shadow-church-sm scale-[1.02]'
                      : 'bg-church-surface text-church-ink-muted border border-church-border hover:text-church-ink hover:border-church-border-strong hover:bg-church-bg-alt'
                  }`}
                >
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded tracking-wider uppercase ${
                      isActive
                        ? 'bg-white/20 text-dark border'
                        : 'bg-church-bg-alt text-church-accent-deep'
                    }`}
                  >
                    {tab.date}
                  </span>
                  <span className="truncate max-w-[200px] sm:max-w-none">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Event Details Card with Animated Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedId}-${lang}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-church-surface border border-church-border rounded-3xl overflow-hidden shadow-church-md"
          >
            {/* Event Header Banner */}
            <div className="p-6 sm:p-8 lg:p-10 border-b border-church-border bg-gradient-to-br from-church-surface to-church-bg-alt/40">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-church-cta text-church-cta-text">
                    {activeEvent.dateRange}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 text-xs font-medium text-church-ink-muted hover:text-church-ink px-3 py-1.5 rounded-full border border-church-border bg-church-surface hover:border-church-border-strong transition-all cursor-pointer"
                    title={t('eventShareLabel')}
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          {t('eventCopiedLabel')}
                        </span>
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        <span>{t('eventShareLabel')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-church-ink leading-tight tracking-tight">
                {activeEvent.name}
              </h3>

              {/* Meta Chips */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-xs sm:text-sm text-church-ink-muted">
                <div className="inline-flex items-center gap-2">
                  <Calendar size={16} className="text-church-accent shrink-0" />
                  <span>{activeEvent.dateRange}</span>
                </div>
                {activeEvent.time && (
                  <div className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-church-accent shrink-0" />
                    <span>{activeEvent.time}</span>
                  </div>
                )}
                {activeEvent.location && (
                  <div className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-church-accent shrink-0" />
                    <span>{activeEvent.location}</span>
                  </div>
                )}
              </div>

              {/* Theme & Verse Highlight Quote */}
              {activeEvent.theme && (
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-church-accent-tint/30 border border-church-border">
                  <div className="flex items-start gap-3">
                    <Sparkles size={18} className="text-church-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-church-accent">
                        {t('eventThemeLabel')}
                      </span>
                      <p className="font-display italic text-base sm:text-lg text-church-ink mt-1 leading-relaxed">
                        “{activeEvent.theme}”
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Purpose statement */}
              <p className="mt-5 text-base sm:text-lg text-church-ink-muted leading-relaxed">
                {activeEvent.purpose}
              </p>
            </div>

            {/* Content Body: Schedule & What to Expect & Actions */}
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Column: Schedule & What to Expect (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-10">
                {/* Schedule Timeline */}
                {activeEvent.keyDates && activeEvent.keyDates.length > 0 && (
                  <div>
                    <h4 className="font-display font-semibold text-xl text-church-ink mb-5 flex items-center gap-2.5">
                      <Calendar size={20} className="text-church-accent" />
                      <span>{t('eventScheduleLabel')}</span>
                    </h4>

                    <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-church-border">
                      {activeEvent.keyDates.map((item, idx) => (
                        <div key={idx} className="relative group">
                          {/* Timeline dot */}
                          <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full bg-church-surface border-2 border-church-accent transition-transform group-hover:scale-125 group-hover:bg-church-cta" />

                          <div className="bg-church-bg-alt/60 hover:bg-church-bg-alt p-4 sm:p-5 rounded-2xl border border-church-border transition-colors">
                            <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                              <span className="font-bold text-xs uppercase tracking-wider text-church-cta-text bg-church-cta px-2.5 py-0.5 rounded-md">
                                {item.date}
                              </span>
                              {item.label && (
                                <span className="text-xs font-semibold text-church-accent">
                                  {item.label}
                                </span>
                              )}
                            </div>
                            <h5 className="font-display font-semibold text-base sm:text-lg text-church-ink mt-1">
                              {item.title}
                            </h5>
                            <p className="text-sm text-church-ink-muted mt-1 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Actions, Resources & Location (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Action Steps & Resources */}
                {activeEvent.actionSteps && activeEvent.actionSteps.length > 0 && (
                  <div className="p-6 rounded-3xl bg-church-bg-alt/50 border border-church-border">
                    <h4 className="font-display font-semibold text-xl text-church-ink mb-4 flex items-center gap-2.5">
                      <Download size={20} className="text-church-accent" />
                      <span>{t('eventActionsLabel')}</span>
                    </h4>

                    <div className="space-y-4">
                      {activeEvent.actionSteps.map((step, idx) => {
                        const isDownload = step.type === 'download'
                        const isVideo = step.type === 'video'
                        return (
                          <div
                            key={idx}
                            className="bg-church-surface p-4 sm:p-5 rounded-2xl border border-church-border flex flex-col justify-between gap-3 transition-all hover:border-church-border-strong hover:shadow-xs"
                          >
                            <div>
                              <h5 className="font-display font-semibold text-base text-church-ink flex items-center gap-2">
                                {isDownload && <Download size={16} className="text-church-accent" />}
                                {isVideo && <Video size={16} className="text-church-accent" />}
                                <span>{step.title}</span>
                              </h5>
                              <p className="text-xs sm:text-sm text-church-ink-muted mt-1.5 leading-relaxed">
                                {step.desc}
                              </p>
                            </div>

                            <a
                              href={step.href || '#contact'}
                              onClick={(e) => {
                                if (step.href?.startsWith('#')) {
                                  e.preventDefault()
                                  handleScrollToSection(step.href)
                                }
                              }}
                              className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-church-cta text-church-cta-text hover:bg-church-cta-hover transition-all w-full text-center group mt-1"
                            >
                              <span>{step.cta}</span>
                              <ChevronRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 sm:px-10 py-4 bg-church-bg-alt/40 border-t border-church-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-church-ink-muted">
                Brayton Church · {activeEvent.name}
              </span>

              <button
                type="button"
                onClick={onBackToEvents}
                className="inline-flex items-center gap-2 text-xs font-semibold text-church-ink hover:text-church-accent transition-colors cursor-pointer"
              >
                <ArrowUp size={14} />
                <span>{t('eventBackToAll')}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
