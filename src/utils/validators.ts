export const isNullOrUndefined = (value: unknown): value is undefined | null => {
  return value === null || value === undefined
}

export const isEmptyArray = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length === 0
}
export const requiredValidator = (value: unknown, t?: (key: string, params?: any) => string) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) return 'This field is required'

  return !!String(value).trim().length || 'This field is required'
}
