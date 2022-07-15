export function ApplyPhoneMask(value: string) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2');
}

export function UndoPhoneMask(value: string) {
  return value.replace(/\D/g, '');
}
