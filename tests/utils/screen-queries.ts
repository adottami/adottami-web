import { screen } from '@testing-library/react';

screen.queryMetaByProperty = (property: string): HTMLMetaElement | null => {
  return document.querySelector<HTMLMetaElement>(`meta[property='${property}']`);
};

screen.getMetaByProperty = (property: string): HTMLMetaElement => {
  const metaElement = screen.queryMetaByProperty(property);
  if (!metaElement) {
    throw new Error(`No meta tag with property '${property}' found.`);
  }
  return metaElement;
};

screen.queryMetaByName = (name: string): HTMLMetaElement | null => {
  return document.querySelector<HTMLMetaElement>(`meta[name='${name}']`);
};

screen.getMetaByName = (name: string): HTMLMetaElement => {
  const metaElement = screen.queryMetaByName(name);
  if (!metaElement) {
    throw new Error(`No meta tag with name '${name}' found.`);
  }
  return metaElement;
};
