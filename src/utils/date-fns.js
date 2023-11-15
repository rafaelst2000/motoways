import { parseISO, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formattedRelativeDate = (date) => {
  const formattedDate = parseISO(date)
  const relativeDate = formatDistanceToNow(formattedDate, {
    addSuffix: true,
    locale: ptBR,
  })

  return relativeDate.replace('cerca de ', '')
}

export const formattedTimeToMinHours = (seconds) => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}min`
  } else {
    const hours = Math.floor(seconds / 3600)
    const remainingMinutes = Math.floor((seconds % 3600) / 60)
    const hourString = `${hours}h`
    const minuteString = remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''
    return `${hourString}${minuteString}`
  }
}
