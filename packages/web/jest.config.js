/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo/web',
  transformIgnorePatterns: [
    'node_modules/(?!(@sportspay/shared)/)',
  ],
};
