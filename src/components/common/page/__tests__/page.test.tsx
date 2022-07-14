import { render } from '@testing-library/react';

import tailwindConfig from '@@/tailwind.config';

import { expectPageDescription, expectPageTitle } from '@tests/utils/screen-assertions';
import { getMetaByName, getMetaByProperty } from '@tests/utils/screen-queries';

import { BASE_PAGE_TITLE, DEFAULT_PAGE_DESCRIPTION } from '../constants';
import Page from '../page';
import { expectPageTitleWithBase } from './utils';

describe('Page', () => {
  it('should render the correct static meta elements', () => {
    render(<Page />);

    expect(getMetaByName('theme-color')).toHaveAttribute('content', tailwindConfig.theme.extend.colors.surface.primary);
    expect(getMetaByProperty('og:type')).toHaveAttribute('content', 'website');
    expect(getMetaByName('twitter:card')).toHaveAttribute('content', 'summary_large_image');
    expect(getMetaByProperty('og:site_name')).toHaveAttribute('content', BASE_PAGE_TITLE);
  });

  it('should apply the provided title', () => {
    const title = 'Page';
    render(<Page title={title} />);
    expectPageTitleWithBase(title);
  });

  it('should apply the base page title as default if no title is provided', () => {
    render(<Page />);
    expectPageTitle(BASE_PAGE_TITLE);
  });

  it('should apply the provided description, or the default if no one was specified', () => {
    const { rerender } = render(<Page description={undefined} />);
    expectPageDescription(DEFAULT_PAGE_DESCRIPTION);

    const description = 'Page description';
    rerender(<Page description={description} />);
    expectPageDescription(description);
  });
});
