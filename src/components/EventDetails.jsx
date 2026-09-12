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
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import {
  DEFAULT_API_EVENTS,
  normalizeEvent,
  downloadEventCalendar,
} from '../services/eventService.js'

export default function EventDetails({
  selectedId = 'seed-event-brayton-1',
  events = [],
  onSelectEvent,
  onBackToEvents,
}) {
  const { lang, t } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Current active event detail content
  const activeEvent =
    events.find((e) => String(e.id) === String(selectedId)) ||
    events[0] ||
    normalizeEvent(DEFAULT_API_EVENTS[0], lang)

  // Event titles for the switcher tabs
  const availableEvents =
    events.length > 0
      ? events
      : DEFAULT_API_EVENTS.map((e) => normalizeEvent(e, lang))

  const eventTabs = availableEvents.map((item) => ({
    id: item.id,
    name: item.title,
    date: item.badgeDate || item.date || '',
  }))

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#event-details`
    const shareData = {
      title: `${activeEvent.title} - ${t('churchName')}`,
      text: activeEvent.description,
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

  const activeIndex = eventTabs.findIndex((tab) => String(tab.id) === String(selectedId))
  const displayBadgeNum = activeIndex >= 0 ? activeIndex + 1 : 1

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
                {t('eventSelectedBadge')} #{displayBadgeNum}
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
        {eventTabs.length > 1 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-church-ink-muted">
                {t('eventBrowseAll')}:
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {eventTabs.map((tab) => {
                const isActive = String(tab.id) === String(selectedId)
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectEvent && onSelectEvent(tab.id)}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-church-cta text-church-cta-text shadow-church-sm scale-[1.02]'
                        : 'bg-church-surface text-church-ink-muted border border-church-border hover:text-church-ink hover:border-church-border-strong hover:bg-church-bg-alt'
                    }`}
                  >
                    {tab.date && (
                      <span
                        className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded tracking-wider uppercase ${
                          isActive
                            ? 'bg-church-surface/30 text-church-cta-text border border-church-cta-text/20'
                            : 'bg-church-bg-alt text-church-accent-deep'
                        }`}
                      >
                        {tab.date}
                      </span>
                    )}
                    <span className="truncate max-w-[200px] sm:max-w-none">{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Active Event Details Card with Animated Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeEvent.id}-${lang}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-church-surface border border-church-border rounded-3xl overflow-hidden shadow-church-md"
          >
            {/* Cover Image Display */}
            {activeEvent.coverImageUrl && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-church-bg-alt">
                <img
                  src={activeEvent.coverImageUrl}
                  alt={activeEvent.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-church-cta text-church-cta-text shadow-sm backdrop-blur-xs">
                    {activeEvent.dateRange || activeEvent.badgeDate}
                  </span>
                  {activeEvent.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-white border border-white/20 backdrop-blur-xs">
                      {activeEvent.category}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Event Header Banner */}
            <div className="p-6 sm:p-8 lg:p-10 border-b border-church-border bg-gradient-to-br from-church-surface to-church-bg-alt/40">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-church-cta text-church-cta-text">
                    {activeEvent.dateRange || activeEvent.badgeDate}
                  </span>
                  {activeEvent.status && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {activeEvent.status}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => downloadEventCalendar(activeEvent)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-church-ink-muted hover:text-church-ink px-3 py-1.5 rounded-full border border-church-border bg-church-surface hover:border-church-border-strong transition-all cursor-pointer"
                    title="Add to Calendar (.ics)"
                  >
                    <Download size={13} className="text-church-accent" />
                    <span>{lang === 'my' ? 'ပြက္ခဒိန်သို့ထည့်ရန်' : 'Add to Calendar'}</span>
                  </button>

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
                {activeEvent.title}
              </h3>

              {/* Meta Chips */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-xs sm:text-sm text-church-ink-muted">
                {activeEvent.dateRange && (
                  <div className="inline-flex items-center gap-2">
                    <Calendar size={16} className="text-church-accent shrink-0" />
                    <span>{activeEvent.dateRange}</span>
                  </div>
                )}
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

              {/* Purpose / Description */}
              {activeEvent.description && (
                <p className="mt-5 text-base sm:text-lg text-church-ink-muted leading-relaxed">
                  {activeEvent.description}
                </p>
              )}
            </div>

            {/* Content Body: Schedule & Actions */}
            <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Column: Schedule Timeline (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {activeEvent.schedule && activeEvent.schedule.length > 0 ? (
                  <div>
                    <h4 className="font-display font-semibold text-xl text-church-ink mb-5 flex items-center gap-2.5">
                      <Calendar size={20} className="text-church-accent" />
                      <span>{t('eventScheduleLabel')}</span>
                    </h4>

                    <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-church-border">
                      {activeEvent.schedule.map((item, idx) => (
                        <div key={item.id || idx} className="relative group">
                          {/* Timeline dot */}
                          <div className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full bg-church-surface border-2 border-church-accent transition-transform group-hover:scale-125 group-hover:bg-church-cta" />

                          <div className="bg-church-bg-alt/60 hover:bg-church-bg-alt p-4 sm:p-5 rounded-2xl border border-church-border transition-colors">
                            <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                              <span className="font-bold text-xs uppercase tracking-wider text-church-cta-text bg-church-cta px-2.5 py-0.5 rounded-md">
                                {item.timeFormatted || item.dateBadge || item.date || 'Schedule'}
                              </span>
                            </div>
                            <h5 className="font-display font-semibold text-base sm:text-lg text-church-ink mt-1">
                              {item.title}
                            </h5>
                            {item.description && (
                              <p className="text-sm text-church-ink-muted mt-1.5 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-church-bg-alt/40 border border-church-border">
                    <h4 className="font-display font-semibold text-lg text-church-ink mb-2">
                      {t('eventScheduleLabel')}
                    </h4>
                    <p className="text-sm text-church-ink-muted">
                      {lang === 'my'
                        ? 'ဤအစီအစဉ်အတွက် အသေးစိတ် အချိန်ဇယားကို မကြာမီ ထပ်မံဖော်ပြပေးပါမည်။'
                        : 'Detailed schedule for this event will be announced shortly.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Actions & Location Card (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Quick Actions Card */}
                <div className="p-6 rounded-3xl bg-church-bg-alt/50 border border-church-border flex flex-col gap-4">
                  <h4 className="font-display font-semibold text-xl text-church-ink flex items-center gap-2.5">
                    <Sparkles size={20} className="text-church-accent" />
                    <span>{t('eventActionsLabel')}</span>
                  </h4>

                  <div className="space-y-3">
                    {/* Add to Calendar Action */}
                    <button
                      type="button"
                      onClick={() => downloadEventCalendar(activeEvent)}
                      className="w-full inline-flex items-center justify-between gap-3 p-4 rounded-2xl bg-church-surface border border-church-border hover:border-church-border-strong hover:shadow-xs transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-church-accent-tint flex items-center justify-center shrink-0">
                          <Download size={18} className="text-church-accent" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-sm text-church-ink">
                            {lang === 'my' ? 'ပြက္ခဒိန်ဖိုင် ဒေါင်းလုဒ်လုပ်ရန်' : 'Download Calendar (.ics)'}
                          </div>
                          <div className="text-xs text-church-ink-muted">
                            {lang === 'my'
                              ? 'ဖုန်းနှင့် ကွန်ပျူတာပြက္ခဒိန်သို့ ထည့်ရန်'
                              : 'Sync to Apple Calendar, Google, or Outlook'}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-church-ink-muted group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Plan a Visit / Contact */}
                    <button
                      type="button"
                      onClick={() => handleScrollToSection('#contact')}
                      className="w-full inline-flex items-center justify-between gap-3 p-4 rounded-2xl bg-church-surface border border-church-border hover:border-church-border-strong hover:shadow-xs transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-church-accent-tint flex items-center justify-center shrink-0">
                          <MapPin size={18} className="text-church-accent" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-sm text-church-ink">
                            {lang === 'my' ? 'လာရောက်လည်ပတ်ရန် မေးမြန်းပါ' : 'Plan a Visit or Ask Questions'}
                          </div>
                          <div className="text-xs text-church-ink-muted">
                            {lang === 'my'
                              ? 'လမ်းညွှန်ချက်နှင့် အချက်အလက်များ'
                              : 'Directions, seating, & translation headsets'}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-church-ink-muted group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Watch Livestream */}
                    <button
                      type="button"
                      onClick={() => handleScrollToSection('#sermons')}
                      className="w-full inline-flex items-center justify-between gap-3 p-4 rounded-2xl bg-church-surface border border-church-border hover:border-church-border-strong hover:shadow-xs transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-church-accent-tint flex items-center justify-center shrink-0">
                          <ExternalLink size={18} className="text-church-accent" />
                        </div>
                        <div>
                          <div className="font-display font-semibold text-sm text-church-ink">
                            {lang === 'my' ? 'တရားဒေသနာများ ကြည့်ရန်' : 'Watch Online Sermons'}
                          </div>
                          <div className="text-xs text-church-ink-muted">
                            {lang === 'my'
                              ? 'ယခင် အစီအစဉ်များနှင့် ဒေသနာများ'
                              : 'Past messages and live broadcasts'}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-church-ink-muted group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-6 rounded-3xl bg-church-surface border border-church-border">
                  <div className="flex items-center gap-2 mb-2 text-church-accent font-semibold text-xs uppercase tracking-wider">
                    <MapPin size={14} />
                    <span>{t('eventLocationLabel')}</span>
                  </div>
                  <h5 className="font-display font-semibold text-base text-church-ink">
                    {activeEvent.location}
                  </h5>
                  <p className="text-xs text-church-ink-muted mt-1 leading-relaxed">
                    124 Brayton Avenue, Fort Union, IN 46000
                  </p>
                  <p className="text-xs text-church-ink-muted mt-2">
                    {lang === 'my'
                      ? 'အခမဲ့ ကားပါကင်နှင့် နှစ်ဘာသာ စကားပြန် နားကြပ်များ အဆင်သင့်ရှိပါသည်။'
                      : 'Free on-site parking and bilingual translation headsets available for all guests.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-6 sm:px-10 py-4 bg-church-bg-alt/40 border-t border-church-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-church-ink-muted">
                Brayton Church · {activeEvent.title}
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

