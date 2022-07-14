export function queryMetaByProperty(property: string): HTMLMetaElement | null {
  return document.querySelector<HTMLMetaElement>(`meta[property='${property}']`);
}

export function getMetaByProperty(property: string): HTMLMetaElement {
  const metaElement = queryMetaByProperty(property);
  if (!metaElement) {
    throw new Error(`No meta tag with property '${property}' found.`);
  }
  return metaElement;
}

export function queryMetaByName(name: string): HTMLMetaElement | null {
  return document.querySelector<HTMLMetaElement>(`meta[name='${name}']`);
}

export function getMetaByName(name: string): HTMLMetaElement {
  const metaElement = queryMetaByName(name);
  if (!metaElement) {
    throw new Error(`No meta tag with name '${name}' found.`);
  }
  return metaElement;
}
