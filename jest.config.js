const { compilerOptions } = require('./tsconfig')

module.exports = {
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  preset: "ts-jest",
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
 },
}
