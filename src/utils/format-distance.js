import { formatNumber } from './format-number'

export const formattedDistance = (distance) => {
  if (distance <= 0) return distance + 'km'
  return formatNumber(distance / 1000) + 'km'
}
