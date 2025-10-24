/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    // support @/ paths (same as tsconfig.json baseUrl)
    "^@/(.*)$": "<rootDir>/$1",
    // mock CSS and image imports
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

