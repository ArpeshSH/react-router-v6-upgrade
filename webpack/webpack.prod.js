const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
// const WorkboxPlugin = require("workbox-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const config = require("./index");

const paths = config.utils_paths;

const prodConfig = {
  mode: "production",
  output: {
    path: paths.dist(),
    filename: "[name].[contenthash].js",
    publicPath: config.compiler_public_path,
    chunkFilename: "[name].[contenthash].js",
  },
  optimization: {
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
      cacheGroups: {},
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({}),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
    }),

    /* If service workers are required in your application */
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: paths.base("service-worker/service-worker.js"),
    //   exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
    //   swDest: "service-worker.js",
    // }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
