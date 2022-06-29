import { createContext } from '@/utils/contexts';

export interface APIContextValue {}

const APIContext = createContext<APIContextValue>('APIContext');

export default APIContext;
