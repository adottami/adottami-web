import { expectPageTitle } from '@tests/utils/screen-assertions';

import { BASE_PAGE_TITLE } from '../constants';

export function expectPageTitleWithBase(partialBaseTitle: string) {
  expectPageTitle(`${partialBaseTitle} | ${BASE_PAGE_TITLE}`);
}
