module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*protocols.ts', '!<rootDir>/src/**/index.ts'],
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  // collectCoverage: true,
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
