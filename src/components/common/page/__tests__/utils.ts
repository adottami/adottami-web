import { expectPageTitle } from '@tests/utils/screen-assertions';

import { APPLICATION_NAME } from '../constants';

export function expectPageTitleWithApplicationName(partialTitle: string) {
  expectPageTitle(`${partialTitle} | ${APPLICATION_NAME}`);
}
