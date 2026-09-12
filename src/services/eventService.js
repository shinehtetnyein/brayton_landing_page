// Event Service for Brayton Church
// Fetches events from the API with fallback to default seed data.

import { apiRoute } from "../api/apiRoute"
import { API_BASE_URL } from "../api/apiUrl"

const eventsAPI_URL = API_BASE_URL + apiRoute.events;
const contactAPI_URL = API_BASE_URL + apiRoute.contact;

// Handles localization for both English and Myanmar languages.
// Default seed events matching the exact API schema provided
export const DEFAULT_API_EVENTS = [
  {
    id: 'seed-event-brayton-1',
    organizationId: 'cmtwr0oy4005923o5krzg9kx4',
    title: 'Easter Sunday Service',
    titleMy: 'အီစတာ တနင်္ဂနွေ ဝတ်ပြုကိုးကွယ်ခြင်း',
    description: 'Join us for our annual Easter celebration.',
    descriptionMy:
      'နှစ်စဉ်ကျင်းပမြဲဖြစ်သော ကျွန်ုပ်တို့၏ အီစတာ အထိမ်းအမှတ် ဝတ်ပြုပွဲတွင် အတူတကွ ပါဝင်ဆင်နွှဲရန် ဖိတ်ခေါ်အပ်ပါသည်။',
    startAt: '2026-04-05T09:00:00.000Z',
    endAt: '2026-04-05T11:00:00.000Z',
    location: 'Brayton Church Sanctuary',
    locationMy: 'ဘရေတန် နှစ်ခြင်းအသင်းတော် ဝတ်ပြုရာ အဓိကခန်းမဆောင်',
    status: 'PUBLISHED',
    createdBy: 'cmtwr0p06005a23o5aq1vpdkt',
    createdAt: '2026-09-11T09:23:17.824Z',
    updatedAt: '2026-09-11T11:56:44.834Z',
    category: 'Worship',
    themeName: 'ထမြောက်ခြင်းအသက်တာ',
    themeNameEn: 'Resurrection Life',
    isFeatured: true,
    coverMediaId: 'cmtwwgauz000b19t9rpb0rvud',
    schedule: [
      {
        id: 'cmtwwi1ew000c19t9ejat2n9i',
        eventId: 'seed-event-brayton-1',
        title: 'မနက်ပိုင်း ဝတ်ပြုကိုးကွယ်ခြင်း',
        titleEn: 'Morning Worship & Praise',
        description: 'ထမြောက်ခြင်းအသက်တာ',
        descriptionEn: 'Celebration of the Risen Christ & Fellowship',
        startAt: '2026-09-13T01:00:00.000Z',
        endAt: '2026-09-13T03:00:00.000Z',
        createdAt: '2026-09-11T11:56:44.834Z',
        updatedAt: '2026-09-11T11:56:44.834Z',
      },
      {
        id: 'cmtwwi1ew000c19t9ejat2n9j',
        eventId: 'seed-event-brayton-1',
        title: 'အီစတာ မိတ်သဟာယ နံနက်စာ',
        titleEn: 'Easter Fellowship Breakfast',
        description: 'အသင်းသားများနှင့် ဧည့်သည်တော်များ အတူတကွ နံနက်စာ သုံးဆောင်ခြင်း',
        descriptionEn: 'Gathering for warm breakfast and community connection in the hall.',
        startAt: '2026-09-13T03:30:00.000Z',
        endAt: null,
        createdAt: '2026-09-11T11:56:44.834Z',
        updatedAt: '2026-09-11T11:56:44.834Z',
      },
    ],
    coverImageUrl:
      'http://api.microraysolution.com/uploads/cmtwr0oy4005923o5krzg9kx4/1789127723765-51435786.jpg',
  },
  {
    id: 'seed-event-brayton-2',
    organizationId: 'cmtwr0oy4005923o5krzg9kx4',
    title: 'Christian Home Week',
    titleMy: 'ခရစ်ယာန် မိသားစု သီတင်းပတ်',
    description:
      'A special week dedicated to strengthening marriages, building faith, and renewing family connections.',
    descriptionMy:
      'မိသားစုများ အတူတကွ မိတ်သဟာယဖွဲ့ရန်၊ စားသောက်ရန်နှင့် ကစားနည်းများ ပါဝင်ဆင်နွှဲရန် အစီအစဉ်။',
    startAt: '2026-08-30T10:00:00.000Z',
    endAt: '2026-09-06T12:00:00.000Z',
    location: 'Main Sanctuary & Fellowship Hall',
    locationMy: 'အဓိက ဝတ်ပြုရာခန်းမဆောင်နှင့် မိတ်သဟာယခန်းမ',
    status: 'PUBLISHED',
    category: 'Family',
    themeName: 'ပြောင်းလဲနေသော လောကအလယ် ခရစ်တော်ကို ဗဟိုပြုသော မိသားစုများ တည်ဆောက်ခြင်း',
    themeNameEn: 'Building Christ-Centered Homes in a Changing World',
    isFeatured: false,
    schedule: [
      {
        id: 'chw-sched-1',
        eventId: 'seed-event-brayton-2',
        title: 'Christian Marriage Seminar',
        titleMy: 'ခရစ်ယာန် အိမ်ထောင်ရေး သင်တန်း',
        description: 'Focusing on sacred marriage bonds and commitment in Christ.',
        descriptionMy: 'ခရစ်တော်၌ သန့်ရှင်းသောအိမ်ထောင်ရေး ကတိသစ္စာပြုခြင်းနှင့် မေတ္တာထားရှိမှု။',
        startAt: '2026-08-30T10:00:00.000Z',
        endAt: null,
      },
      {
        id: 'chw-sched-2',
        eventId: 'seed-event-brayton-2',
        title: 'Family Prayer & Discipleship',
        titleMy: 'မိသားစု ဆုတောင်းခြင်းနှင့် နှုတ်ကပတ်တော်ဝေငှခြင်း',
        description: 'Empowering parents to guide children in faith.',
        descriptionMy: 'သားသမီးများအား ယုံကြည်ခြင်း၌ ပဲ့ပြင်ထိန်းကျောင်းရန် နည်းလမ်းများ။',
        startAt: '2026-09-02T18:30:00.000Z',
        endAt: null,
      },
    ],
    coverImageUrl:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'seed-event-brayton-3',
    organizationId: 'cmtwr0oy4005923o5krzg9kx4',
    title: 'Baptism Sunday Celebration',
    titleMy: 'နှစ်ခြင်းမင်္ဂလာ တနင်္ဂနွေ',
    description:
      "We celebrate believer's baptism during both morning services. All are invited to witness and rejoice.",
    descriptionMy:
      'နံနက်ခင်း ဝတ်ပြုပွဲနှစ်ခုစလုံးတွင် ယုံကြည်သူနှစ်ခြင်းမင်္ဂလာကို ကျင်းပပါမည်။ သက်သေခံနိုင်ရန် လူတိုင်းကို ဖိတ်ခေါ်ပါသည်။',
    startAt: '2026-09-13T09:30:00.000Z',
    endAt: '2026-09-13T12:30:00.000Z',
    location: 'Main Sanctuary Baptistery',
    locationMy: 'အဓိက ဝတ်ပြုခန်းမ နှစ်ခြင်းကန်တော်',
    status: 'PUBLISHED',
    category: 'Service',
    themeName: '“အသက်တာသစ်၌ ကျင်လည်စေခြင်းငှာ နှစ်ခြင်းမင်္ဂလာအားဖြင့် သင်္ဂြိုဟ်ခြင်းသို့ ရောက်ကြပြီ။” — ရောမ ၆:၄',
    themeNameEn: '“Buried with Him in baptism, raised to walk in newness of life.” — Romans 6:4',
    isFeatured: false,
    schedule: [
      {
        id: 'bap-sched-1',
        eventId: 'seed-event-brayton-3',
        title: 'Candidate Orientation & Prayer',
        titleMy: 'နှစ်ခြင်းခံမည့်သူများနှင့် ဆုတောင်းပြင်ဆင်ခြင်း',
        description: 'Pastoral briefing and prayers for baptism candidates.',
        descriptionMy: 'နှစ်ခြင်းခံမည့်သူများနှင့် မိသားစုဝင်များအတွက် ပြင်ဆင်မှုဆိုင်ရာ ဆွေးနွေးခြင်း။',
        startAt: '2026-09-13T08:45:00.000Z',
        endAt: null,
      },
      {
        id: 'bap-sched-2',
        eventId: 'seed-event-brayton-3',
        title: 'Bilingual Baptismal Service',
        titleMy: 'နှစ်ဘာသာ ဝတ်ပြုကိုးကွယ်ခြင်းနှင့် နှစ်ခြင်းမင်္ဂလာ',
        description: 'Candidates give personal testimonies of faith followed by immersion baptism.',
        descriptionMy: 'ယုံကြည်သူများ၏ သက်သေခံချက်နှင့် နှစ်ခြင်းခံယူခြင်း မင်္ဂလာ။',
        startAt: '2026-09-13T09:30:00.000Z',
        endAt: null,
      },
    ],
    coverImageUrl:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'seed-event-brayton-4',
    organizationId: 'cmtwr0oy4005923o5krzg9kx4',
    title: 'Myanmar Heritage Night',
    titleMy: 'မြန်မာ့ရိုးရာ ညစာစားပွဲ',
    description:
      "A night of traditional music, food, and testimony honoring our congregation's roots.",
    descriptionMy:
      'ကျွန်ုပ်တို့ အသင်းသားများ၏ အမြစ်ကို ဂုဏ်ပြုသည့် ရိုးရာဂီတ၊ အစားအစာနှင့် သက်သေခံချက် ညတစ်ည။',
    startAt: '2026-09-27T17:30:00.000Z',
    endAt: '2026-09-27T20:30:00.000Z',
    location: 'Brayton Church Fellowship Hall',
    locationMy: 'ဘရေတန် နှစ်ခြင်းအသင်းတော် မိတ်သဟာယခန်းမ',
    status: 'PUBLISHED',
    category: 'Fellowship',
    themeName: 'အသင်းတော်သမိုင်းနှင့် ယဉ်ကျေးမှုအမွေအနှစ် ထိန်းသိမ်းခြင်း',
    themeNameEn: 'Honoring Heritage & Praising God in Every Language',
    isFeatured: false,
    schedule: [
      {
        id: 'her-sched-1',
        eventId: 'seed-event-brayton-4',
        title: 'Traditional Fellowship Dinner',
        titleMy: 'ရိုးရာအစားအစာများ ဧည့်ခံခြင်းနှင့် ကြိုဆိုခြင်း',
        description: 'Traditional Myanmar delicacies shared among all generations.',
        descriptionMy: 'မိသားစုများ ကိုယ်တိုင်ချက်ပြုတ်ထားသော ရိုးရာအစားအစာများ အတူတကွ သုံးဆောင်ခြင်း။',
        startAt: '2026-09-27T17:30:00.000Z',
        endAt: null,
      },
      {
        id: 'her-sched-2',
        eventId: 'seed-event-brayton-4',
        title: 'Choral Music & Stories',
        titleMy: 'တေးဂီတချီးမွမ်းခြင်းနှင့် အတွေ့အကြုံမျှဝေခြင်း',
        description: 'Historic hymns sung in Karen, Burmese, and English.',
        descriptionMy: 'ကရင်၊ မြန်မာ နှင့် အင်္ဂလိပ် သီချင်းများဖြင့် ဘုရားသခင်ကို ဂုဏ်ပြုချီးမွမ်းခြင်း။',
        startAt: '2026-09-27T19:00:00.000Z',
        endAt: null,
      },
    ],
    coverImageUrl:
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=900&q=80',
  },
]

const MYANMAR_MONTHS = [
  'ဇန်နဝါရီ',
  'ဖေဖော်ဝါရီ',
  'မတ်',
  'ဧပြီ',
  'မေ',
  'ဇွန်',
  'ဇူလိုင်',
  'သြဂုတ်',
  'စက်တင်ဘာ',
  'အောက်တိုဘာ',
  'နိုဝင်ဘာ',
  'ဒီဇင်ဘာ',
]

const MYANMAR_NUMERALS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉']

export function toMyanmarNumber(num) {
  if (num === null || num === undefined) return ''
  return String(num).replace(/\d/g, (d) => MYANMAR_NUMERALS[d] || d)
}

/**
 * Format badge date, e.g. "APR 05" or "ဧပြီ ၅"
 */
export function formatBadgeDate(isoString, lang = 'en') {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    if (isNaN(d.getTime())) return ''

    const monthIndex = d.getUTCMonth()
    const day = d.getUTCDate()

    if (lang === 'my') {
      return `${MYANMAR_MONTHS[monthIndex]} ${toMyanmarNumber(day)}`
    }

    const monthShort = d
      .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
      .toUpperCase()
    return `${monthShort} ${String(day).padStart(2, '0')}`
  } catch {
    return ''
  }
}

/**
 * Format full date range string, e.g. "April 5, 2026" or "April 5 – 7, 2026"
 */
export function formatDateRange(startIso, endIso, lang = 'en') {
  if (!startIso) return ''
  try {
    const start = new Date(startIso)
    if (isNaN(start.getTime())) return ''

    const startYear = start.getUTCFullYear()
    const startMonth = start.getUTCMonth()
    const startDay = start.getUTCDate()

    let end = endIso ? new Date(endIso) : null
    if (end && isNaN(end.getTime())) end = null

    if (lang === 'my') {
      const yearMy = toMyanmarNumber(startYear)
      const monthMy = MYANMAR_MONTHS[startMonth]
      const dayMy = toMyanmarNumber(startDay)

      if (end && (end.getUTCDate() !== startDay || end.getUTCMonth() !== startMonth)) {
        const endDayMy = toMyanmarNumber(end.getUTCDate())
        return `${yearMy}၊ ${monthMy} ${dayMy} – ${endDayMy}`
      }
      return `${yearMy}၊ ${monthMy} ${dayMy} ရက်`
    }

    const monthLong = start.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
    if (end && (end.getUTCDate() !== startDay || end.getUTCMonth() !== startMonth)) {
      const endMonthLong = end.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
      if (startMonth === end.getUTCMonth()) {
        return `${monthLong} ${startDay} – ${end.getUTCDate()}, ${startYear}`
      }
      return `${monthLong} ${startDay} – ${endMonthLong} ${end.getUTCDate()}, ${startYear}`
    }

    return `${monthLong} ${startDay}, ${startYear}`
  } catch {
    return startIso
  }
}

/**
 * Format time range, e.g. "9:00 AM – 11:00 AM" or "နံနက် ၉:၀၀ – ၁၁:၀၀"
 */
export function formatTimeRange(startIso, endIso, lang = 'en') {
  if (!startIso) return ''
  try {
    const formatSingleTime = (d) => {
      let hours = d.getUTCHours()
      const minutes = d.getUTCMinutes()
      const isAm = hours < 12
      hours = hours % 12 || 12
      const minStr = String(minutes).padStart(2, '0')

      if (lang === 'my') {
        const period = isAm ? 'နံနက်' : 'ညနေ'
        return `${period} ${toMyanmarNumber(hours)}:${toMyanmarNumber(minStr)}`
      }
      const period = isAm ? 'AM' : 'PM'
      return `${hours}:${minStr} ${period}`
    }

    const start = new Date(startIso)
    const startTimeStr = formatSingleTime(start)

    if (!endIso) return startTimeStr

    const end = new Date(endIso)
    const endTimeStr = formatSingleTime(end)

    return `${startTimeStr} – ${endTimeStr}`
  } catch {
    return ''
  }
}

/**
 * Format a schedule item's time, e.g. "9:00 AM" or "Sep 13 · 9:00 AM"
 */
export function formatScheduleTime(isoString, lang = 'en') {
  if (!isoString) return ''
  try {
    const d = new Date(isoString)
    if (isNaN(d.getTime())) return ''

    const monthIndex = d.getUTCMonth()
    const day = d.getUTCDate()
    let hours = d.getUTCHours()
    const minutes = d.getUTCMinutes()
    const isAm = hours < 12
    hours = hours % 12 || 12
    const minStr = String(minutes).padStart(2, '0')

    if (lang === 'my') {
      const datePart = `${MYANMAR_MONTHS[monthIndex]} ${toMyanmarNumber(day)}`
      const period = isAm ? 'နံနက်' : 'ညနေ'
      const timePart = `${period} ${toMyanmarNumber(hours)}:${toMyanmarNumber(minStr)}`
      return `${datePart} · ${timePart}`
    }

    const monthShort = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    const period = isAm ? 'AM' : 'PM'
    return `${monthShort} ${day} · ${hours}:${minStr} ${period}`
  } catch {
    return ''
  }
}

/**
 * Normalize an event object (from API or seed) with localized presentation fields
 */
export function normalizeEvent(raw, lang = 'en') {
  if (!raw) return null

  const isMy = lang === 'my'
  const title = isMy && raw.titleMy ? raw.titleMy : raw.title || ''
  const description = isMy && raw.descriptionMy ? raw.descriptionMy : raw.description || ''
  const location = isMy && raw.locationMy ? raw.locationMy : raw.location || 'Brayton Church Sanctuary'
  const theme =
    isMy
      ? raw.themeName || raw.themeNameEn || ''
      : raw.themeNameEn || raw.themeName || ''

  const badgeDate = formatBadgeDate(raw.startAt, lang)
  const dateRange = formatDateRange(raw.startAt, raw.endAt, lang)
  const time = formatTimeRange(raw.startAt, raw.endAt, lang)

  // Map schedule items
  const schedule = (raw.schedule || []).map((item) => {
    const itemTitle = isMy && item.titleMy ? item.titleMy : item.title || ''
    const itemDesc = isMy && item.descriptionMy ? item.descriptionMy : item.description || ''
    const timeFormatted = formatScheduleTime(item.startAt, lang)

    return {
      ...item,
      title: itemTitle,
      description: itemDesc,
      timeFormatted,
      dateBadge: formatBadgeDate(item.startAt, lang),
    }
  })

  return {
    ...raw,
    title,
    description,
    location,
    theme,
    badgeDate,
    dateRange,
    time,
    schedule,
    coverImageUrl:
      raw.coverImageUrl ||
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  }
}

/**
 * Fetch events from API endpoint with graceful fallback to default seed data
 */
export async function fetchEvents(apiUrl = eventsAPI_URL) {
  // 1. Attempt fetch from primary apiUrl (proxied in dev mode to prevent CORS)
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        return data
      }
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        return data.data
      }
    }
  } catch (err) {
    console.warn('Events fetch from primary URL failed:', err?.message || err)
  }

  // 2. If primary failed and was not direct remote URL, try direct remote URL as fallback
  if (apiUrl !== REMOTE_API_URL) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)

      const response = await fetch(REMOTE_API_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          return data
        }
      }
    } catch (err) {
      console.warn('Events fetch from direct URL failed:', err?.message || err)
    }
  }

  // Fallback to rich seed events including the exact API payload
  return DEFAULT_API_EVENTS
}

export async function fetchPostContactMessage({ name, email, message }) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(contactAPI_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response.ok
  } catch (err) {
    console.warn('Contact message submission failed:', err?.message || err)
    return false
  }
}

/**
 * Generate and trigger download of an .ics calendar file for an event
 */
export function downloadEventCalendar(event) {
  if (!event || !event.startAt) return

  const startDate = new Date(event.startAt)
  const endDate = event.endAt ? new Date(event.endAt) : new Date(startDate.getTime() + 2 * 3600000)

  const toIcsDate = (d) =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Brayton Church//Event//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id || 'brayton-event'}@braytonchurch.org`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(startDate)}`,
    `DTEND:${toIcsDate(endDate)}`,
    `SUMMARY:${(event.title || 'Brayton Church Event').replace(/,/g, '\\,')}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${(event.location || 'Brayton Church Sanctuary').replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${(event.title || 'brayton-event').toLowerCase().replace(/\s+/g, '-')}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
