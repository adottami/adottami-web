import globalConfig from '@/config/global-config/global-config';

export function withBaseAdottamiURL(path: string): string {
  const separator = path.startsWith('/') ? '' : '/';
  return `${globalConfig.baseAdottamiURL()}${separator}${path}`;
}
