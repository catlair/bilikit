export function toLowerCaseHeaders(headers?: Record<string, string | string[]>) {
  if (!headers) return {}
  return Object.entries(headers).reduce(
    (acc, [key, value]) => (acc[key.toLowerCase()] = value, acc),
    {} as Record<string, string | string[]>,
  )
}
