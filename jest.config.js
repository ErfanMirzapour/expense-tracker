module.exports = {
   roots: ['<rootDir>/src'],
   testEnvironment: 'jest-environment-jsdom',
   setupFilesAfterEnv: ['<rootDir>/jest/tests-setup.ts'],
   testRegex: '(/__tests__/.+|.+\\.test)\\.tsx?$',
   // Tests default timeout
   slowTestThreshold: 3,
   // Clear mock between tests
   clearMocks: true,

   // Make jest able to resolve all absolute imports
   moduleDirectories: ['src', 'node_modules'],
   moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],

   // Next three options clarify jest how to deal with different modules,
   // just like webpack but for test environment
   moduleNameMapper: {
      '\\.module\\.scss$': 'identity-obj-proxy',
   },
   transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
      '^(?!.*\\.(ts|tsx|json)$)': '<rootDir>/jest/file-transformer.ts',
   },
   transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '^.+\\.module\\.scss$',
   ],

   coverageProvider: 'babel',
   coverageDirectory: 'coverage',
   collectCoverageFrom: ['src/**/*.{ts,tsx}'],
   coveragePathIgnorePatterns: ['index\\.tsx?', '.+\\.d\\.ts'],
};
