import { Screen } from '@testing-library/dom';

declare module '@testing-library/dom' {
  export const screen: Screen & {
    queryMetaByProperty(property: string): HTMLMetaElement | null;
    getMetaByProperty(property: string): HTMLMetaElement;
    queryMetaByName(name: string): HTMLMetaElement | null;
    getMetaByName(name: string): HTMLMetaElement;
  };
}
