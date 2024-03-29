import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import createNextHeadMock from './mocks/next-head';
import testServer from './test-server';
import testQueryClient from './utils/test-query-client';
import './utils/screen-queries';

global.ResizeObserver = ResizeObserver;

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

jest.mock('next/head', () => createNextHeadMock());
