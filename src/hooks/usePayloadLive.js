import { useState, useEffect, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLivePreview } from '@payloadcms/live-preview-react'
import {
  getMtscHomePageData,
  getMtscWhoWeArePageData,
  getMtscSeafarerSupportPageData,
  getMtscWaysToGivePageData,
  getMtscPublicationsPageData,
  getMtscContactPageData,
  populateMediaCache,
} from '../services/payloadApi'

const CMS_URL = import.meta.env.VITE_CMS_URL || 'https://mtsc-halifax-cms.cloudgenz.com'

/**
 * Detects whether the current window is embedded inside Payload CMS Admin iframe
 */
const isInIframe = typeof window !== 'undefined' && window.self !== window.top

/**
 * Validates whether data is a non-empty CMS object with actual MTSC content
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
 * Reads persistent cached data from localStorage for instant 0ms rendering
 */
function getStorageCache(key) {
  try {
    const raw = localStorage.getItem(`mtsc_data_v2_${key}`)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return isValidCmsData(parsed) ? parsed : null
  } catch {
    return null
  }
}

/**
 * Saves valid data to localStorage for resilience against tab switches & network drops
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
 * Evaluates candidates in priority order.
 * Inside CMS Admin Iframe: Live Preview messages take top priority.
 * Outside Iframe (Normal Visitor): API initialData takes priority, protected by lastValidRef & localStorage.
 */
function getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey) {
  if (isInIframe) {
    if (isValidCmsData(postMessageData)) {
      lastValidRef.current = postMessageData
      setStorageCache(cacheKey, postMessageData)
      return postMessageData
    }
    if (isValidCmsData(liveData)) {
      lastValidRef.current = liveData
      setStorageCache(cacheKey, liveData)
      return liveData
    }
  }

  if (isValidCmsData(initialData)) {
    lastValidRef.current = initialData
    setStorageCache(cacheKey, initialData)
    return initialData
  }

  if (isValidCmsData(lastValidRef.current)) {
    return lastValidRef.current
  }
  return getStorageCache(cacheKey)
}

/**
 * Custom hook combining TanStack React Query + Payload Live Preview for MTSC HomePage
 */
export function useMtscHomePageLive() {
  const cacheKey = 'mtsc-home-page'
  const lastValidRef = useRef(getStorageCache(cacheKey))
  const [, setMediaCacheTick] = useState(0)

  useEffect(() => {
    const handleMediaCached = () => {
      setMediaCacheTick(t => t + 1)
    }
    window.addEventListener('payload-media-cached', handleMediaCached)
    return () => window.removeEventListener('payload-media-cached', handleMediaCached)
  }, [])

  const { data: initialData, isLoading, error } = useQuery({
    queryKey: ['mtsc-home-page-data'],
    queryFn: getMtscHomePageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData)
    }
  }, [initialData])

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current,
    serverURL: CMS_URL,
    depth: 2,
  })

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData)
    }
  }, [liveData])

  const [postMessageData, setPostMessageData] = useState(null)

  useEffect(() => {
    if (!isInIframe) return
    const handleMessage = (event) => {
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-home-page' ||
        event?.data?.globalType === 'mtsc-home-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data
        if (payloadData && isValidCmsData(payloadData)) {
          setPostMessageData({ ...payloadData })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const activeData = useMemo(() => {
    return getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey)
  }, [postMessageData, liveData, initialData])

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData),
    error,
  }
}

/**
 * Custom hook combining TanStack React Query + Payload Live Preview for MTSC Who We Are Page
 */
export function useMtscWhoWeAreLive() {
  const cacheKey = 'mtsc-whoweare-page'
  const lastValidRef = useRef(getStorageCache(cacheKey))
  const [, setMediaCacheTick] = useState(0)

  useEffect(() => {
    const handleMediaCached = () => {
      setMediaCacheTick(t => t + 1)
    }
    window.addEventListener('payload-media-cached', handleMediaCached)
    return () => window.removeEventListener('payload-media-cached', handleMediaCached)
  }, [])

  const { data: initialData, isLoading, error } = useQuery({
    queryKey: ['mtsc-whoweare-page-data'],
    queryFn: getMtscWhoWeArePageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData)
    }
  }, [initialData])

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current,
    serverURL: CMS_URL,
    depth: 2,
  })

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData)
    }
  }, [liveData])

  const [postMessageData, setPostMessageData] = useState(null)

  useEffect(() => {
    if (!isInIframe) return
    const handleMessage = (event) => {
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-whoweare-page' ||
        event?.data?.globalType === 'mtsc-whoweare-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data
        if (payloadData && isValidCmsData(payloadData)) {
          setPostMessageData({ ...payloadData })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const activeData = useMemo(() => {
    return getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey)
  }, [postMessageData, liveData, initialData])

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData),
    error,
  }
}

/**
 * Custom hook combining TanStack React Query + Payload Live Preview for MTSC Seafarer Support Page
 */
export function useMtscSeafarerSupportLive() {
  const cacheKey = 'mtsc-support-page'
  const lastValidRef = useRef(getStorageCache(cacheKey))
  const [, setMediaCacheTick] = useState(0)

  useEffect(() => {
    const handleMediaCached = () => {
      setMediaCacheTick(t => t + 1)
    }
    window.addEventListener('payload-media-cached', handleMediaCached)
    return () => window.removeEventListener('payload-media-cached', handleMediaCached)
  }, [])

  const { data: initialData, isLoading, error } = useQuery({
    queryKey: ['mtsc-support-page-data'],
    queryFn: getMtscSeafarerSupportPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData)
    }
  }, [initialData])

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current,
    serverURL: CMS_URL,
    depth: 2,
  })

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData)
    }
  }, [liveData])

  const [postMessageData, setPostMessageData] = useState(null)

  useEffect(() => {
    if (!isInIframe) return
    const handleMessage = (event) => {
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-support-page' ||
        event?.data?.globalType === 'mtsc-support-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data
        if (payloadData && isValidCmsData(payloadData)) {
          setPostMessageData({ ...payloadData })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const activeData = useMemo(() => {
    return getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey)
  }, [postMessageData, liveData, initialData])

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData),
    error,
  }
}

/**
 * Custom hook combining TanStack React Query + Payload Live Preview for MTSC Ways to Give Page
 */
export function useMtscWaysToGiveLive() {
  const cacheKey = 'mtsc-waystogive-page'
  const lastValidRef = useRef(getStorageCache(cacheKey))
  const [, setMediaCacheTick] = useState(0)

  useEffect(() => {
    const handleMediaCached = () => {
      setMediaCacheTick(t => t + 1)
    }
    window.addEventListener('payload-media-cached', handleMediaCached)
    return () => window.removeEventListener('payload-media-cached', handleMediaCached)
  }, [])

  const { data: initialData, isLoading, error } = useQuery({
    queryKey: ['mtsc-waystogive-page-data'],
    queryFn: getMtscWaysToGivePageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData)
    }
  }, [initialData])

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current,
    serverURL: CMS_URL,
    depth: 2,
  })

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData)
    }
  }, [liveData])

  const [postMessageData, setPostMessageData] = useState(null)

  useEffect(() => {
    if (!isInIframe) return
    const handleMessage = (event) => {
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-waystogive-page' ||
        event?.data?.globalType === 'mtsc-waystogive-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data
        if (payloadData && isValidCmsData(payloadData)) {
          setPostMessageData({ ...payloadData })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const activeData = useMemo(() => {
    return getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey)
  }, [postMessageData, liveData, initialData])

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData),
    error,
  }
}

/**
 * Custom hook combining TanStack React Query + Payload Live Preview for MTSC Publications Page
 */
export function useMtscPublicationsLive() {
  const cacheKey = 'mtsc-publications-page'
  const lastValidRef = useRef(getStorageCache(cacheKey))
  const [, setMediaCacheTick] = useState(0)

  useEffect(() => {
    const handleMediaCached = () => {
      setMediaCacheTick(t => t + 1)
    }
    window.addEventListener('payload-media-cached', handleMediaCached)
    return () => window.removeEventListener('payload-media-cached', handleMediaCached)
  }, [])

  const { data: initialData, isLoading, error } = useQuery({
    queryKey: ['mtsc-publications-page-data'],
    queryFn: getMtscPublicationsPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData)
    }
  }, [initialData])

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current,
    serverURL: CMS_URL,
    depth: 2,
  })

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData)
    }
  }, [liveData])

  const [postMessageData, setPostMessageData] = useState(null)

  useEffect(() => {
    if (!isInIframe) return
    const handleMessage = (event) => {
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-publications-page' ||
        event?.data?.globalType === 'mtsc-publications-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data
        if (payloadData && isValidCmsData(payloadData)) {
          setPostMessageData({ ...payloadData })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const activeData = useMemo(() => {
    return getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey)
  }, [postMessageData, liveData, initialData])

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData),
    error,
  }
}

/**
 * Custom hook combining TanStack React Query + Payload Live Preview for MTSC Contact Page
 */
export function useMtscContactLive() {
  const cacheKey = 'mtsc-contact-page'
  const lastValidRef = useRef(getStorageCache(cacheKey))
  const [, setMediaCacheTick] = useState(0)

  useEffect(() => {
    const handleMediaCached = () => {
      setMediaCacheTick(t => t + 1)
    }
    window.addEventListener('payload-media-cached', handleMediaCached)
    return () => window.removeEventListener('payload-media-cached', handleMediaCached)
  }, [])

  const { data: initialData, isLoading, error } = useQuery({
    queryKey: ['mtsc-contact-page-data'],
    queryFn: getMtscContactPageData,
    initialData: () => getStorageCache(cacheKey),
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })

  useEffect(() => {
    if (isValidCmsData(initialData)) {
      populateMediaCache(initialData)
    }
  }, [initialData])

  const { data: liveData } = useLivePreview({
    initialData: initialData || lastValidRef.current,
    serverURL: CMS_URL,
    depth: 2,
  })

  useEffect(() => {
    if (isValidCmsData(liveData)) {
      populateMediaCache(liveData)
    }
  }, [liveData])

  const [postMessageData, setPostMessageData] = useState(null)

  useEffect(() => {
    if (!isInIframe) return
    const handleMessage = (event) => {
      if (
        event?.data?.type === 'payload-live-preview' ||
        event?.data?.slug === 'mtsc-contact-page' ||
        event?.data?.globalType === 'mtsc-contact-page'
      ) {
        const payloadData = event.data.data || event.data.doc || event.data
        if (payloadData && isValidCmsData(payloadData)) {
          setPostMessageData({ ...payloadData })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const activeData = useMemo(() => {
    return getBestData(postMessageData, liveData, initialData, lastValidRef, cacheKey)
  }, [postMessageData, liveData, initialData])

  return {
    data: activeData,
    isLoading: !isValidCmsData(activeData),
    error,
  }
}
