export const localeString = (value, digits, language = 'pt-BR') => {
  value = Number(value)
  if (!value && value !== 0) return value
  if (digits === 0) return Math.trunc(value).toLocaleString(language)
  if (!digits) return value.toLocaleString(language)
  return value.toLocaleString(language, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export const formatNumber = (value) => {
  if (value === '-') return value
  if (value || value === 0) {
    return localeString(value, 1)
  } else return '-'
}
