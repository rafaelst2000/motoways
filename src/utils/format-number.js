export const localeString = (value, digits, language = 'pt-BR') => {
  if (!value && value !== 0) return value
  if (digits === 0) return Math.trunc(value).toLocaleString(language)
  if (!digits) return value.toLocaleString(language)
  return value.toLocaleString(language, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export const formatNumber = (value, digits = 1) => {
  console.log('eu')
  if (value === '-') return value
  if (value || value === 0) {
    if (typeof value === 'number') return localeString(value, digits)
    return localeString(value)
  } else return '-'
}
