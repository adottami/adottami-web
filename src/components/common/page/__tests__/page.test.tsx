import { render, screen } from '@testing-library/react';

import tailwindConfig from '@@/tailwind.config';

import { expectPageDescription, expectPageTitle } from '@tests/utils/screen-assertions';

import { APPLICATION_NAME, DEFAULT_PAGE_DESCRIPTION } from '../constants';
import Page from '../page';
import { expectPageTitleWithApplicationName } from './utils';

describe('Page', () => {
  it('should render the correct static meta elements', () => {
    render(<Page />);

    const themeColor = tailwindConfig.theme.extend.colors.surface.primary;
    expect(screen.getMetaByName('theme-color')).toHaveAttribute('content', themeColor);
    expect(screen.getMetaByName('application-name')).toHaveAttribute('content', APPLICATION_NAME);
    expect(screen.getMetaByProperty('og:type')).toHaveAttribute('content', 'website');
    expect(screen.getMetaByName('twitter:card')).toHaveAttribute('content', 'summary_large_image');
    expect(screen.getMetaByProperty('og:site_name')).toHaveAttribute('content', APPLICATION_NAME);
  });

  it('should apply the provided title', () => {
    const title = 'Page';
    render(<Page title={title} />);
    expectPageTitleWithApplicationName(title);
  });

  it('should apply the base page title as default if no title is provided', () => {
    render(<Page />);
    expectPageTitle(APPLICATION_NAME);
  });

  it('should apply the provided description, or the default if no one was specified', () => {
    const { rerender } = render(<Page description={undefined} />);
    expectPageDescription(DEFAULT_PAGE_DESCRIPTION);

    const description = 'Page description';
    rerender(<Page description={description} />);
    expectPageDescription(description);
  });
});
