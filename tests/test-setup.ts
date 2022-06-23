import testServer from './test-server';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

beforeAll(async () => {
  testServer.listen();
});

beforeEach(() => {
  testServer.resetHandlers();
});

afterAll(() => {
  testServer.close();
});
