import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import EventDetails from './EventDetails.jsx'

export default function Events() {
  const { t } = useLanguage()
  const [selectedEventId, setSelectedEventId] = useState(1)

  const events = [1, 2, 3, 4].map((n) => ({
    id: n,
    date: t(`event${n}Date`),
    title: t(`event${n}Title`),
    desc: t(`event${n}Desc`),
    image: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
    ][n - 1],
  }))

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
      <section id="events" className="py-5 relative bg-church-bg-alt scroll-mt-20">
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
              const isSelected = selectedEventId === ev.id
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
                      src={ev.image}
                      alt={ev.title}
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

                  <div className="mt-4 mx-5 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-church-cta-text bg-church-cta px-3 py-1 rounded-full">
                      <Calendar size={12} />
                      {ev.date}
                    </span>

                    {isSelected && (
                      <span className="text-[11px] font-semibold text-church-accent">
                        {t('eventSelectedBadge')}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 mx-5 font-display font-semibold text-lg text-church-ink leading-snug">
                    {ev.title}
                  </h3>
                  <p className="mt-2 mx-5 mb-4 text-sm leading-relaxed text-church-ink-muted">
                    {ev.desc}
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
        onSelectEvent={(id) => setSelectedEventId(id)}
        onBackToEvents={handleBackToEvents}
      />
    </>
  )
}
