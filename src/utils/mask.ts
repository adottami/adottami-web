export function applyPhoneMask(value: string) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2');
}

export function undoPhoneMask(value: string) {
  return value.replace(/\D/g, '');
}
