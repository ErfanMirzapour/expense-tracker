module.exports = {
   roots: ['<rootDir>/src'],
   testEnvironment: 'jest-environment-jsdom',
   setupFilesAfterEnv: ['<rootDir>/jest/setupTests.ts'],
   testRegex: '(/__tests__/.+|.+\\.test)\\.tsx?$',
   // Tests default timeout
   slowTestThreshold: 3,
   // Clear mock between tests
   clearMocks: true,

   // Make jest able to resolve all absolute imports
   moduleDirectories: ['src', 'node_modules'],
   moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],

   moduleNameMapper: {
      '\\.module\\.scss$': 'identity-obj-proxy',
   },

   coverageProvider: 'babel',
   coverageDirectory: 'coverage',
   collectCoverageFrom: ['src/**/*.{ts,tsx}'],
   coveragePathIgnorePatterns: ['index\\.tsx?', '.+\\.d\\.ts'],
};
