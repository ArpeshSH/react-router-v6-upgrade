const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const config = require("./index");
const packageJson = require("../package.json");

const paths = config.utils_paths;

const commonConfig = {
  entry: {
    app: paths.client("index.js"),
  },

  resolve: {
    extensions: [".js", ".jsx"],

    // To define absolute path
    alias: {
      app: paths.base("./app"),
      public: paths.base("./public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(c|le)ss$/,
        exclude: [
          /\.module\.(c|le)ss$/,
          /[\\/]node_modules[\\/]((?!(react-day-picker|react-toastify|react-draft-wysiwyg|react-quill|@dtsl|emoji-mart-virtualized)).*)[\\/]/,
        ],
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(c|le)ss$/,
        include: /\.module\.(c|le)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(md|png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(config.globals),
    new WebpackBar({
      name: config.name,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.base("public/assets"),
          to: paths.dist("public"),
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),

    new ModuleFederationPlugin({
      name: "reactboilerplate",
      filename: "remoteEntryContainer.js",
      exposes: {
        "./DemoApp": paths.client("bootstrap.js"),
      },

      shared: [
        {
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: packageJson.dependencies["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: packageJson.dependencies["react-router-dom"],
          },
        },
      ],
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\\/]locale$/,
      /de|fr|en|pt|es|it/
    ),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.base("public/index.html"),
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
      )
    ),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: `/${config.compiler_public_path}/`,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.app.filter(
          (fileName) => !fileName.endsWith(".map")
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
};

if (config.isAnalyze) {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  commonConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true,
      statsOptions: { source: false },
    })
  );
}

module.exports = commonConfig;
