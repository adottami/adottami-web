import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { PageQueryKey } from './types';

interface PageQuery extends ParsedUrlQuery {
  [PageQueryKey.PUBLICATION_ID]: string;
}

interface PageParameters {
  publicationId?: string;
}

function usePageParameters(): PageParameters {
  const router = useRouter();

  const { [PageQueryKey.PUBLICATION_ID]: publicationId } = router.query as PageQuery;

  const parameters: PageParameters = { publicationId };
  return parameters;
}

export default usePageParameters;
