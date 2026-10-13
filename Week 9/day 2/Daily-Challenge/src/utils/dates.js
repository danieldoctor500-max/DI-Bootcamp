export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function isDateKey(key) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return false
  return toDateKey(fromDateKey(key)) === key
}

export function formatLongDate(key) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(fromDateKey(key))
}

export function formatShortDate(key) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  }).format(fromDateKey(key))
}
