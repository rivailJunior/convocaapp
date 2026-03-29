/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo/web',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(@sportspay/shared)/)',
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
