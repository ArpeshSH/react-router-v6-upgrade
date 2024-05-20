const resolve = require("resolve");

module.exports = {
  roots: ["<rootDir>"],
  setupFiles: [require.resolve("whatwg-fetch")],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: resolve.sync("jest-environment-jsdom", {
    basedir: require.resolve("jest"),
  }),

  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/store/actions/**",
    "!app/store/store.js",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/jest/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/tests/jest/__mocks__/fileMock.js",
  },
  testMatch: ["**/?(*.)(spec|test).js?(x)"],
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(@dtsl/react|@dtsl/icons))"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  globals: {
    API_URL: "",
    GTM_ID: "GTM-test",
    APP_ENV: "local",
    SENTRY_URL: "",
    REACT_APP_APM_SERVICE_URL: "",
  },
};
