import globalConfig from '@/config/global-config/global-config';

import AdottamiClient from '../adottami-client';
import PublicationClient from '../publication-client/publication-client';
import SessionClient from '../session-client/session-client';
import UserClient from '../user-client/user-client';

describe('Adottami client', () => {
  it('should initialize correctly', () => {
    const adottamiClient = new AdottamiClient();

    expect(adottamiClient.baseURL()).toBe(globalConfig.baseAdottamiURL());
    expect(adottamiClient.users).toBeInstanceOf(UserClient);
    expect(adottamiClient.session).toBeInstanceOf(SessionClient);
    expect(adottamiClient.publications).toBeInstanceOf(PublicationClient);
  });
});
