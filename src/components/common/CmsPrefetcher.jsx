import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import {
  getMtscHomePageData,
  getMtscWhoWeArePageData,
  getMtscSeafarerSupportPageData,
  getMtscWaysToGivePageData,
  getMtscPublicationsPageData,
  getMtscContactPageData,
  populateMediaCache,
} from '../../services/payloadApi'

/**
 * Validates whether data is a non-empty CMS object
 */
function isValidCmsData(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return false
  const keys = Object.keys(d)
  if (keys.length <= 2) return false
  return Boolean(
    d.title_line_1 ||
      d.title ||
      d.slug ||
      d.hero_strong_text ||
      d.eyebrow_badge ||
      d.intro_title ||
      d.hero_title ||
      d.story_title ||
      d.impact_title ||
      d.team_title ||
      d.id
  )
}

/**
 * Checks whether valid data exists in localStorage
 */
function hasStorageCache(key) {
  try {
    const raw = localStorage.getItem(`mtsc_data_v2_${key}`)
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return isValidCmsData(parsed)
  } catch {
    return false
  }
}

/**
 * Saves valid data to localStorage for instant 0ms rendering across sessions
 */
function setStorageCache(key, data) {
  if (!isValidCmsData(data)) return
  try {
    localStorage.setItem(`mtsc_data_v2_${key}`, JSON.stringify(data))
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Smart Universal CMS Prefetcher Component.
 * Detects whatever page the user landed on, lets the current landing page fetch first,
 * and after 2 seconds prefetches all remaining un-cached pages with a 300ms staggered gap.
 */
export default function CmsPrefetcher() {
  const queryClient = useQueryClient()
  const location = useLocation()

  useEffect(() => {
    // 2.0s initial idle delay after current page load
    const timer = setTimeout(() => {
      const allPages = [
        {
          path: '/',
          cacheKey: 'mtsc-home-page',
          queryKey: ['mtsc-home-page-data'],
          fn: getMtscHomePageData,
        },
        {
          path: '/whoweare',
          cacheKey: 'mtsc-whoweare-page',
          queryKey: ['mtsc-whoweare-page-data'],
          fn: getMtscWhoWeArePageData,
        },
        {
          path: '/support',
          cacheKey: 'mtsc-support-page',
          queryKey: ['mtsc-support-page-data'],
          fn: getMtscSeafarerSupportPageData,
        },
        {
          path: '/WaysToGive',
          cacheKey: 'mtsc-waystogive-page',
          queryKey: ['mtsc-waystogive-page-data'],
          fn: getMtscWaysToGivePageData,
        },
        {
          path: '/publication',
          cacheKey: 'mtsc-publications-page',
          queryKey: ['mtsc-publications-page-data'],
          fn: getMtscPublicationsPageData,
        },
        {
          path: '/contact',
          cacheKey: 'mtsc-contact-page',
          queryKey: ['mtsc-contact-page-data'],
          fn: getMtscContactPageData,
        },
      ]

      const currentPath = location.pathname.toLowerCase()

      // Exclude current landing page (since current page is already fetching/fetched)
      // and filter pages that are not yet cached in localStorage
      const remainingPages = allPages.filter(page => {
        const isCurrentPage = page.path.toLowerCase() === currentPath
        return !isCurrentPage && !hasStorageCache(page.cacheKey)
      })

      remainingPages.forEach(({ cacheKey, queryKey, fn }, index) => {
        setTimeout(async () => {
          try {
            const data = await queryClient.fetchQuery({
              queryKey,
              queryFn: fn,
              staleTime: 1000 * 60 * 30, // 30 minutes
            })
            if (data && isValidCmsData(data)) {
              populateMediaCache(data)
              setStorageCache(cacheKey, data)
            }
          } catch {
            // Ignore background prefetch errors gracefully
          }
        }, index * 300) // Staggered 300ms interval
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [queryClient, location.pathname])

  return null
}
