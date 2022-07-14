import { queryMetaByName, queryMetaByProperty, getMetaByName, getMetaByProperty } from '@tests/utils/screen-queries';

export function expectPageTitle(title: string | null) {
  if (title === null) {
    expect(document.title).toBe('');
    expect(queryMetaByName('application-name')).not.toBeInTheDocument();
    expect(queryMetaByProperty('og:title')).not.toBeInTheDocument();
    expect(queryMetaByName('twitter:title')).not.toBeInTheDocument();
  } else {
    expect(document.title).toBe(title);
    expect(getMetaByName('application-name')).toHaveAttribute('content', title);
    expect(getMetaByProperty('og:title')).toHaveAttribute('content', title);
    expect(getMetaByName('twitter:title')).toHaveAttribute('content', title);
  }
}

export function expectPageDescription(description: string | null) {
  if (description === null) {
    expect(queryMetaByName('description')).not.toBeInTheDocument();
    expect(getMetaByProperty('og:description')).not.toBeInTheDocument();
    expect(queryMetaByName('twitter:description')).not.toBeInTheDocument();
  } else {
    expect(getMetaByName('description')).toHaveAttribute('content', description);
    expect(getMetaByProperty('og:description')).toHaveAttribute('content', description);
    expect(getMetaByName('twitter:description')).toHaveAttribute('content', description);
  }
}
