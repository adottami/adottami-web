import testServer from './test-server';
import testQueryClient from './utils/test-query-client';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

global.ResizeObserver = require('resize-observer-polyfill');

beforeAll(async () => {
  testServer.listen();
});

beforeEach(() => {
  testServer.resetHandlers();
  testQueryClient.clear();
});

afterAll(() => {
  testServer.close();
});
