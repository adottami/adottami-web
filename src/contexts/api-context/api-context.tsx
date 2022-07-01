import AdottamiClient from '@/services/adottami-client/adottami-client';
import { createContext } from '@/utils/contexts';

export interface APIContextValue {
  adottami: AdottamiClient;
}

const APIContext = createContext<APIContextValue>('APIContext');

export default APIContext;
