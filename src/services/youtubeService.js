// YouTube Service for Brayton Church
// Fetches the latest videos from the church YouTube playlist with multiple fallback strategies and caching.

export const YOUTUBE_PLAYLIST_ID =
  import.meta.env?.VITE_YOUTUBE_PLAYLIST_ID || 'PLdNVn_iMmTkI'

export const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`

export const DEFAULT_SERMON_VIDEOS = [
  {
    id: 'dAKWhweQZWs',
    title: '27.9.2026 (Brayton Church Noon Service Program)',
    publishedAt: '2026-09-27T02:58:42.000Z',
    thumbnail: 'https://i1.ytimg.com/vi/dAKWhweQZWs/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=dAKWhweQZWs',
  },
  {
    id: 'rwxqIOxSoAk',
    title: '20.9.2026 (Brayton Church Noon Service Program)',
    publishedAt: '2026-09-20T18:15:07.000Z',
    thumbnail: 'https://i3.ytimg.com/vi/rwxqIOxSoAk/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=rwxqIOxSoAk',
  },
  {
    id: 'i82aRifozdE',
    title: '13.9.2026 (Brayton Church Noon Service Program)',
    publishedAt: '2026-09-13T17:53:18.000Z',
    thumbnail: 'https://i2.ytimg.com/vi/i82aRifozdE/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=i82aRifozdE',
  },
]

const CACHE_KEY = `yt_playlist_${YOUTUBE_PLAYLIST_ID}`
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes


/**
 * Main function to retrieve the latest N videos for the church playlist.
 */
export async function getLatestPlaylistVideos(limit = 3, forceRefresh = false) {
  const playlistId = YOUTUBE_PLAYLIST_ID

  // 1. Check browser session storage cache
  if (!forceRefresh && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const cached = window.sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const { timestamp, data } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data) && data.length >= limit) {
          return data.slice(0, limit)
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  let videos = []

  // 2. Try YouTube Data API v3 if API key is provided
  // Sanitize key (strip any accidental surrounding quotes, spaces, or semicolons)
  const rawKey = import.meta.env?.VITE_YOUTUBE_API_KEY
  const apiKey =
    typeof rawKey === 'string'
      ? rawKey.trim().replace(/^["']|["'];?$/g, '').replace(/;$/, '').trim()
      : null

  if (apiKey && apiKey !== '[ENCRYPTION_KEY]' && !apiKey.includes('[') && apiKey.length > 5) {
    try {
      videos = await fetchViaYoutubeApi(playlistId, limit, apiKey)
      console.log('Successfully fetched videos via YouTube Data API v3')
    } catch (err) {
      console.warn('Failed to fetch via YouTube API, trying RSS:', err.message)
    }
  }

  // 3. Try RSS-to-JSON fallback (works without API key)
  if (!videos || videos.length === 0) {
    try {
      videos = await fetchViaRssToJson(playlistId, limit)
    } catch (err) {
      console.warn('Failed to fetch via RSS to JSON, using fallback data:', err.message)
    }
  }

  // 4. Fallback to default recent videos if all remote strategies fail
  if (!videos || videos.length === 0) {
    videos = (DEFAULT_SERMON_VIDEOS || []).slice(0, limit)
  }

  // Save to cache
  if (typeof window !== 'undefined' && window.sessionStorage && videos.length > 0) {
    try {
      window.sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: videos })
      )
    } catch {
      // Ignore quota error
    }
  }

  return videos.slice(0, limit)
}
