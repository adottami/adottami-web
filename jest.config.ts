import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: '.' });

const customJestConfig = {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/tests/test-setup.ts'],
  clearMocks: true,

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/{src,tests}/**/*.{ts,tsx}',
    '!<rootDir>/**/*.test.{ts,tsx}',
    '!<rootDir>/node_modules',
    '!*.{js,ts,json}',
    '!**/types/**/*.ts',
    '!**/types.ts',
    '!**/*.d.ts',
  ],

  testEnvironment: '<rootDir>/tests/test-environment.ts',
  testRegex: '^.+\\.test\\.tsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/public', '<rootDir>/\\.next'],

  transformIgnorePatterns: ['node_modules/.+\\.(ts|tsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/$1',
    '^@/([^\\.]*)$': '<rootDir>/src/$1',
    '^@tests/([^\\.]*)$': '<rootDir>/tests/$1',
  },

  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};

export default createJestConfig(customJestConfig);
