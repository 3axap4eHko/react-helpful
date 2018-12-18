module.exports = {
  verbose: true,
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  'moduleFileExtensions': ['js', 'jsx', 'jss', 'json', 'jsxm', 'node'],
  'modulePathIgnorePatterns': [],
  'unmockedModulePathPatterns': [
    'node_modules/react/',
    'node_modules/enzyme/',
  ],
  'testMatch': [
    '<rootDir>/src/**/__tests__/**/*.js?(x)',
  ],
  'setupFiles': [
    './jest.setup.js',
  ],
};
