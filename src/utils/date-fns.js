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
