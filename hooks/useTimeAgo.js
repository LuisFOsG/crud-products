import { useEffect, useState } from 'react'

const DATE_INITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const isDateTimeFormatSupport = typeof Intl !== 'undefined' && Intl.DateTimeFormat

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const diff = (now - timestamp) / 1000

  for (const [unit, seconds] of DATE_INITS) {
    if (diff > seconds || unit === 'second') {
      const value = Math.floor(diff / seconds)
      return {
        value,
        unit
      }
    }
  }
}

const useTimeAgo = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    let interval

    if (isDateTimeFormatSupport) {
      interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeAgo(newTimeAgo)
      }, 1000)
    }

    return () => interval && clearInterval(interval)
  }, [timestamp])

  if (!isDateTimeFormatSupport) {
    const date = new Date(timestamp)

    return date.toLocaleDateString('es', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const { value, unit } = timeAgo

  const rtf = new Intl.RelativeTimeFormat('es-ES', {
    style: 'short'
  })
  return rtf.format(value * -1, unit)
}

export default useTimeAgo
