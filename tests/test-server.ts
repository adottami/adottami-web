import { setupServer } from 'msw/node';

import { handlers } from './mocks/handlers';

const testServer = setupServer(...handlers);

export default testServer;
