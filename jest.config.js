module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*protocols.ts', '!<rootDir>/src/**/index.ts'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  // collectCoverage: true,
  coverageProvider: 'babel',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
