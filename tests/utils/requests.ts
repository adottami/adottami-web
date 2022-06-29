import { DefaultBodyType, rest } from 'msw';
import { SetupServerApi } from 'msw/lib/node';

import testServer from '@tests/test-server';

export interface TrackedRequest {
  params: Record<string, unknown>;
  body: DefaultBodyType;
}

export function trackRequests<ResponseData>(
  path: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  options: {
    server?: SetupServerApi;
    responseCode?: number;
    responseData?: ResponseData;
  } = {},
): TrackedRequest[] {
  const { server = testServer, responseData = {} } = options;

  const receivedRequests: TrackedRequest[] = [];

  server.use(
    rest[method](path, (request, response, context) => {
      receivedRequests.push({ params: request.params, body: request.body });
      return response(context.json(responseData));
    }),
  );

  return receivedRequests;
}
