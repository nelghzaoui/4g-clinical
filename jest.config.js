// jest.config.js
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/", "<rootDir>/.mock.ts"],
  testPathIgnorePatterns: ["<rootDir>/cypress/", "<rootDir>/node_modules/"],
};
