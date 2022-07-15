import { screen } from '@testing-library/react';

export function expectPageTitle(title: string | null) {
  if (title === null) {
    expect(document.title).toBe('');
    expect(screen.queryMetaByProperty('og:title')).not.toBeInTheDocument();
    expect(screen.queryMetaByName('twitter:title')).not.toBeInTheDocument();
  } else {
    expect(document.title).toBe(title);
    expect(screen.getMetaByProperty('og:title')).toHaveAttribute('content', title);
    expect(screen.getMetaByName('twitter:title')).toHaveAttribute('content', title);
  }
}

export function expectPageDescription(description: string | null) {
  if (description === null) {
    expect(screen.queryMetaByName('description')).not.toBeInTheDocument();
    expect(screen.getMetaByProperty('og:description')).not.toBeInTheDocument();
    expect(screen.queryMetaByName('twitter:description')).not.toBeInTheDocument();
  } else {
    expect(screen.getMetaByName('description')).toHaveAttribute('content', description);
    expect(screen.getMetaByProperty('og:description')).toHaveAttribute('content', description);
    expect(screen.getMetaByName('twitter:description')).toHaveAttribute('content', description);
  }
}
