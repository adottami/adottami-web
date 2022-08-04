import VMasker from 'vanilla-masker';

export function applyPhoneMask(value: string) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2');
}

export function undoPhoneMask(value: string) {
  return value.replace(/\D/g, '');
}

export const zipCode = {
  regex: /^([\d]{5})-([\d]{3})/,
  applyMask: (value: string) => VMasker.toPattern(value.replace(/\D/g, ''), '99999-999'),
  undoMask: (value: string) => value.replace(/\D/g, ''),
};

export const capitalize = (value: string) => {
  value
    .toLowerCase()
    .split(' ')
    .forEach((word) => {
      value = value.replace(word, word.charAt(0).toUpperCase() + word.slice(1));
    });
  return value;
};
