import { DefaultBodyType, ResponseComposition, rest, RestRequest } from 'msw';
import { SetupServerApi } from 'msw/lib/node';

import testServer from '@tests/test-server';

type Headers = Record<string, string>;
type Query = Record<string, string>;

export interface TrackedRequest {
  headers: Headers;
  query: Query;
  params: Record<string, unknown>;
  body: DefaultBodyType;
}

function parseRequestHeaderEntries(request: RestRequest): Headers {
  const headerEntries = Array.from(request.headers.entries());
  return headerEntries.reduce<Headers>((partialHeaders, [key, value]) => {
    partialHeaders[key] = value;
    return partialHeaders;
  }, {});
}

function parseRequestQueryEntries(request: RestRequest): Query {
  const queryEntries = Array.from(request.url.searchParams.entries());
  return queryEntries.reduce<Query>((partialQuery, [key, value]) => {
    partialQuery[key] = value;
    return partialQuery;
  }, {});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trackRequests<ResponseData extends string | number | null | Record<string, any>>(
  path: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  options: {
    server?: SetupServerApi;
    responseCode?: number;
    responseData?: ResponseData | ((request: RestRequest, response: ResponseComposition) => ResponseData);
    beforeSendingResponse?: (request: RestRequest, response: ResponseComposition) => void;
  } = {},
): TrackedRequest[] {
  const { server = testServer, responseCode, responseData, beforeSendingResponse } = options;

  const receivedRequests: TrackedRequest[] = [];

  server.use(
    rest[method](path, (request, response, context) => {
      const parsedHeaders = parseRequestHeaderEntries(request);
      const parsedQuery = parseRequestQueryEntries(request);

      receivedRequests.push({
        headers: parsedHeaders,
        query: parsedQuery,
        params: request.params,
        body: request.body,
      });

      beforeSendingResponse?.(request, response);

      const responseDataAsJSON =
        typeof responseData === 'function' ? context.json(responseData(request, response)) : context.json(responseData);

      return responseCode === undefined
        ? response(responseDataAsJSON)
        : response(context.status(responseCode), responseDataAsJSON);
    }),
  );

  return receivedRequests;
}
