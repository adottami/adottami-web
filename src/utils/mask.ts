import VMasker from 'vanilla-masker';

export function applyPhoneMask(value: string) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2');
}

export function undoPhoneMask(value: string) {
  return value.replace(/\D/g, '');
}

export const zipCodeReg = /^([\d]{5})-([\d]{3})/;

export function applyZipCodeMask(value: string) {
  const pattern = '99999-999';
  return VMasker.toPattern(value.replace(/\D/g, ''), pattern);
}

export function undoZipCodeMask(value: string) {
  return value.replace(/\D/g, '');
}
