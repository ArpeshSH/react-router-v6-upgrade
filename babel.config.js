module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        targets: {},
        useBuiltIns: "usage",
      },
    ],
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "> 2%",
        },
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
  env: {
    test: {
      plugins: ["dynamic-import-node"],
    },
  },
};
