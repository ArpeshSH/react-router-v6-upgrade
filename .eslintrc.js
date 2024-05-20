module.exports = {
  env: {
    node: true,
    es2020: true,
    browser: true,
    mocha: true,
    jest: true,
  },
  globals: {
    API_URL: true,
    GTM_ID: true,
    SENTRY_URL: true,
    APP_ENV: true,
    workbox: true,
    REACT_APP_APM_SERVICE_URL: true,
    elasticApm: true,
  },
  settings: {
    react: {
      version: "latest",
    },
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jsx-a11y/recommended",],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": 2,
    "eol-last": 2,
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
  },
};
