import Head from 'next/head';

import tailwindConfig from '@@/tailwind.config';

import { FCC } from '@/types/react';

import { BASE_PAGE_TITLE, DEFAULT_PAGE_DESCRIPTION } from './constants';

interface Props {
  title?: string;
  description?: string;
}

const Page: FCC<Props> = ({ title: partialTitle, description = DEFAULT_PAGE_DESCRIPTION, children }) => {
  const title = partialTitle ? `${partialTitle} | ${BASE_PAGE_TITLE}` : BASE_PAGE_TITLE;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />

        <meta name="theme-color" content={tailwindConfig.theme.extend.colors.surface.primary} />
        <meta name="application-name" content={title} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={BASE_PAGE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
      </Head>

      {children}
    </>
  );
};

export default Page;
