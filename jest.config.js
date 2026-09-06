module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/js-with-ts-esm',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupTests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@mdi/react|@mdi/js)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^assets/(.*)$': '<rootDir>/assets/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^styles/(.*)$': '<rootDir>/styles/$1',
  },
  testMatch: ['**/__tests__/**/*.test.tsx', '**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
};
