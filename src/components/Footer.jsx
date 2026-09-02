import { Facebook, Youtube, Instagram, Heart, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

const QUICK_LINKS = [
  { key: 'navAbout', to: '/#welcome' },
  { key: 'navBeliefs', to: '/#beliefs' },
  { key: 'navEvents', to: '/#events' },
  { key: 'navSermons', to: '/#sermons' },
  { key: 'navContact', to: '/#contact' },
]

const SOCIALS = [
  { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { Icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
]

const APP_DOWNLOADS = [
  {
    label: 'Google Play',
    subtitle: 'Get it on',
    href: 'https://play.google.com/store/apps',
    kind: 'google-play',
  },
  {
    label: 'App Store',
    subtitle: 'Download on the',
    href: 'https://www.apple.com/app-store/',
    kind: 'app-store',
  },
]

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const services = [1, 2, 4].map((n) => ({
    name: t(`service${n}Name`),
    time: t(`service${n}Time`),
  }))

  return (
    <footer className="bg-[#0D1013] text-[#F9F9FB]/90 pt-12 sm:pt-14">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.85fr_0.95fr_1.1fr] gap-8 lg:gap-10 pb-10 border-b border-[#F9F9FB]/10">
        <div className="flex flex-col">
          <Link to="/" className="inline-flex items-center gap-3 text-white no-underline group">
            <span className="shrink-0">
              <img
                src="/brayton_logo.jpg"
                alt="Brayton Church logo"
                className="w-11 h-11 object-fit block rounded-full"
              />
            </span>
            <span className="font-display font-semibold text-lg text-white">{t('churchName')}</span>
          </Link>
          <p className="mt-4 text-[14.5px] leading-relaxed text-[#F9F9FB]/70 max-w-[40ch]">
            {t('footerAbout')}
          </p>
          <div className="flex items-center gap-2.5 mt-5">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full inline-flex items-center justify-center border border-[#F9F9FB]/20 text-[#F9F9FB]/80 hover:text-white hover:border-white hover:bg-white/10 transition-all"
              >
                <Icon size={17} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="font-body text-xs font-bold tracking-[0.07em] uppercase text-[#F9F9FB]">
            {t('footerLinksHeading')}
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-[14.5px] text-[#F9F9FB]/75 list-none p-0 m-0">
            {QUICK_LINKS.map((link) => (
              <li key={link.key}>
                <Link to={link.to} className="hover:text-white transition-colors">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-body text-xs font-bold tracking-[0.07em] uppercase text-[#F9F9FB]">
            {t('footerServicesHeading')}
          </h3>
          <ul className="mt-4 flex flex-col gap-3 text-[14.5px] text-[#F9F9FB]/75 list-none p-0 m-0">
            {services.map((s) => (
              <li key={s.name} className="flex justify-between gap-2.5">
                <span>{s.name}</span>
                <span className="text-[#F9F9FB]/55 font-medium">{s.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-body text-xs font-bold tracking-[0.07em] uppercase text-[#F9F9FB]">
            {t('footerContactHeading')}
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-[14.5px] text-[#F9F9FB]/75 list-none p-0 m-0">
            <li>{t('contactAddress')}</li>
            <li>{t('contactPhone')}</li>
            <li>{t('contactEmail')}</li>
          </ul>

          <div className="mt-6 p-4 rounded-2xl border border-[#F9F9FB]/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
            <h4 className="font-body text-xs font-bold tracking-[0.07em] uppercase text-[#F9F9FB] mb-2">
              {t('footerDownloadHeading')}
            </h4>
            <p className="text-xs leading-relaxed text-[#F9F9FB]/70 mb-3.5">
              {t('footerDownloadIntro')}
            </p>
            <div className="flex flex-col gap-2.5">
              {APP_DOWNLOADS.map(({ label, subtitle, href, kind }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 w-full p-2.5 rounded-xl border border-[#F9F9FB]/20 bg-white/[0.03] text-[#F9F9FB] hover:border-[#F9F9FB]/40 hover:-translate-y-0.5 transition-all shadow-sm"
                  aria-label={`${label} download`}
                >
                  <span className="w-7 h-7 inline-flex items-center justify-center rounded-lg bg-white/10 text-sm font-bold shrink-0" aria-hidden="true">
                    {kind === 'app-store' ? '' : '▶'}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <small className="text-[9px] uppercase tracking-wider opacity-75">{subtitle}</small>
                    <strong className="text-[13.5px] font-bold">{label}</strong>
                  </span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <img
                className="w-18 h-18 bg-white rounded-xl p-1.5 border border-white/20 shadow-xs"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent('https://play.google.com/store/apps')}`}
                alt={t('footerDownloadQrAlt')}
              />
              <div className="inline-flex items-center gap-2 text-xs text-[#F9F9FB]/75">
                <Download size={14} strokeWidth={2} />
                <span>{t('footerDownloadScan')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-[#F9F9FB]/55">
        <span>{t('footerCopyright').replace('{year}', year)}</span>
        <span className="inline-flex items-center gap-1.5 text-church-accent">
          {t('footerBuilt')} <Heart size={12} fill="currentColor" strokeWidth={0} />
        </span>
      </div>
    </footer>
  )
}
