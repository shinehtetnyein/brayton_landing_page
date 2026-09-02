import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

const initialForm = { name: '', email: '', message: '' }

export default function ContactForm() {
  const { t } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
    setForm(initialForm)
  }

  const infoItems = [
    { Icon: MapPin, label: t('contactAddressLabel'), value: t('contactAddress') },
    { Icon: Phone, label: t('contactPhoneLabel'), value: t('contactPhone') },
    { Icon: Mail, label: t('contactEmailLabel'), value: t('contactEmail') },
  ]

  return (
    <section id="contact" className="py-12 lg:py-16 relative bg-church-bg-alt">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
        <div className="max-w-[640px] mx-auto mb-8 text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-bold tracking-[0.14em] uppercase text-church-accent before:content-[''] before:w-5.5 before:h-[1.5px] before:bg-church-accent">
            {t('contactEyebrow')}
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-church-ink mt-3.5 tracking-tight">
            {t('contactHeading')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-church-ink-muted max-w-[56ch] mx-auto">
            {t('contactIntro')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-12 items-start">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl overflow-hidden border border-church-border shadow-church-sm aspect-[16/10] bg-church-surface" aria-hidden="true">
              <svg viewBox="0 0 320 200" width="100%" height="100%">
                <rect width="320" height="200" fill="var(--color-accent-tint)" />
                <path d="M0,140 L70,120 L120,150 L180,110 L240,135 L320,100" stroke="var(--color-accent)" strokeWidth="3" fill="none" opacity="0.45" />
                <path d="M0,70 L60,90 L140,60 L210,85 L320,55" stroke="var(--color-accent)" strokeWidth="3" fill="none" opacity="0.45" />
                <circle cx="168" cy="98" r="9" fill="var(--color-cta)" />
                <circle cx="168" cy="98" r="16" fill="var(--color-cta)" opacity="0.25" />
                <path d="M168,80 L168,60 M158,70 L178,70" stroke="var(--color-surface)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            <ul className="flex flex-col gap-4.5 m-0 p-0 list-none">
              {infoItems.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3.5">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-church-surface border border-church-border text-church-accent shrink-0 shadow-xs">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[11px] font-bold text-church-ink-faint uppercase tracking-wider">{label}</span>
                    <span className="text-sm sm:text-base font-medium text-church-ink mt-0.5">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            className="bg-church-surface border border-church-border rounded-2xl p-6 sm:p-8 flex flex-col gap-4 shadow-church-sm"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                {t('contactFormName')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t('contactFormName')}
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-lg border border-church-border bg-church-bg text-church-ink text-[15px] focus:outline-none focus:border-church-cta focus:ring-1 focus:ring-church-cta transition-colors placeholder:text-church-ink-muted/60"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {t('contactFormEmail')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t('contactFormEmail')}
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-lg border border-church-border bg-church-bg text-church-ink text-[15px] focus:outline-none focus:border-church-cta focus:ring-1 focus:ring-church-cta transition-colors placeholder:text-church-ink-muted/60"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                {t('contactFormMessage')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t('contactFormMessage')}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-lg border border-church-border bg-church-bg text-church-ink text-[15px] focus:outline-none focus:border-church-cta focus:ring-1 focus:ring-church-cta transition-colors placeholder:text-church-ink-muted/60 resize-y"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-church-cta text-church-cta-text hover:bg-church-cta-hover transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] self-start mt-2 cursor-pointer"
            >
              {t('contactFormSubmit')} <Send size={16} />
            </button>

            {submitted && (
              <motion.p
                className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 size={16} /> {t('contactFormSuccess')}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
