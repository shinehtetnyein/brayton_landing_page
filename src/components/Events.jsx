import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import EventDetails from './EventDetails.jsx'
import {
  fetchEvents,
  normalizeEvent,
  DEFAULT_API_EVENTS,
} from '../services/eventService.js'

export default function Events() {
  const { t, lang } = useLanguage()
  const [eventsData, setEventsData] = useState(DEFAULT_API_EVENTS)
  const [selectedEventId, setSelectedEventId] = useState(
    DEFAULT_API_EVENTS[0]?.id || 'seed-event-brayton-1'
  )
  const [isLoading, setIsLoading] = useState(false)

  // Fetch events on mount or when language context changes
  useEffect(() => {
    let isMounted = true
    async function loadEvents() {
      try {
        setIsLoading(true)
        const data = await fetchEvents()
        if (isMounted && data && data.length > 0) {
          setEventsData(data)
          // Keep current selection if valid, otherwise pick first
          setSelectedEventId((prev) =>
            data.some((e) => String(e.id) === String(prev)) ? prev : data[0].id
          )
        }
      } catch {
        // Handled gracefully inside fetchEvents
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadEvents()
    return () => {
      isMounted = false
    }
  }, [])

  // Localized events mapped through service
  const events = useMemo(() => {
    const list =
      Array.isArray(eventsData) && eventsData.length > 0
        ? eventsData
        : DEFAULT_API_EVENTS
    return list.map((ev) => normalizeEvent(ev, lang))
  }, [eventsData, lang])

  const handleViewDetails = (eventId) => {
    setSelectedEventId(eventId)
    // Smoothly scroll down to the details section
    requestAnimationFrame(() => {
      const detailsEl = document.getElementById('event-details')
      if (detailsEl) {
        detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  const handleBackToEvents = () => {
    const eventsEl = document.getElementById('events')
    if (eventsEl) {
      eventsEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <section id="events" className="py-8 lg:py-12 relative bg-church-bg-alt scroll-mt-20">
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
            {events.map((ev, i) => {
              const isSelected = String(selectedEventId) === String(ev.id)
              return (
                <motion.article
                  key={ev.id}
                  className={`bg-church-surface border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-church-md flex flex-col ${
                    isSelected
                      ? 'border-church-accent-deep ring-2 ring-church-accent/30 shadow-church-sm'
                      : 'border-church-border hover:border-church-border-strong'
                  }`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.07 }}
                >
                  <div className="relative overflow-hidden group">
                    <img
                      className="w-full h-48 object-cover block bg-church-bg-alt transition-transform duration-500 group-hover:scale-105"
                      src={ev.coverImageUrl}
                      alt={ev.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <button
                        type="button"
                        onClick={() => handleViewDetails(ev.id)}
                        className="text-xs font-semibold text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-full hover:bg-black transition-colors cursor-pointer"
                      >
                        {t('eventViewDetails')} &darr;
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 mx-5 flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-church-cta-text bg-church-cta px-3 py-1 rounded-full">
                      <Calendar size={12} />
                      {ev.badgeDate}
                    </span>

                    {isSelected && (
                      <span className="text-[11px] font-semibold text-church-accent">
                        {t('eventSelectedBadge')}
                      </span>
                    )}
                  </div>

                  {ev.theme && (
                    <div className="mt-2.5 mx-5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-church-accent bg-church-accent-tint/50 px-2 py-0.5 rounded-md truncate max-w-full">
                        <Sparkles size={11} className="shrink-0" />
                        <span className="truncate">{ev.theme}</span>
                      </span>
                    </div>
                  )}

                  <h3 className="mt-2.5 mx-5 font-display font-semibold text-lg text-church-ink leading-snug">
                    {ev.title}
                  </h3>
                  <p className="mt-2 mx-5 mb-4 text-sm leading-relaxed text-church-ink-muted line-clamp-3">
                    {ev.description}
                  </p>

                  <div className="mt-auto mx-5 mb-5 pt-3 border-t border-church-border/50">
                    <button
                      type="button"
                      id={`btn-view-details-${ev.id}`}
                      onClick={() => handleViewDetails(ev.id)}
                      className={`w-full inline-flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer group/btn ${
                        isSelected
                          ? 'bg-church-cta text-church-cta-text shadow-xs'
                          : 'bg-church-bg-alt text-church-ink hover:bg-church-cta hover:text-church-cta-text border border-church-border'
                      }`}
                    >
                      <span>{t('eventViewDetails')}</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Connected Details Section */}
      <EventDetails
        selectedId={selectedEventId}
        events={events}
        onSelectEvent={(id) => setSelectedEventId(id)}
        onBackToEvents={handleBackToEvents}
      />
    </>
  )
}

