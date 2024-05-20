const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
// const fs = require('fs');
const config = require("./index");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const paths = config.utils_paths;

const devConfig = {
  mode: "development",

  output: {
    path: paths.dist(config.compiler_public_path),
    publicPath: `/${config.compiler_public_path}/`,
  },

  devServer: {
    hot: true,
    host: config.server_host,
    allowedHosts: config.allowed_hosts,
    port: config.server_port,
    compress: true,
    client: {
      overlay: false,
    },
    historyApiFallback: {
      index: `/${config.compiler_public_path}/index.html`,
    },
    static: [
      {
        directory: paths.dist(config.compiler_public_path),
        publicPath: `/${config.compiler_public_path}/`,
      },
    ],
    headers: {
      // Enable wide open CORS
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },

    /* If your backend api's are running on some other port */
    // proxy: [
    //   {
    //     context: ["/contact/backend"],
    //     changeOrigin: true,
    //     target: "http://contacts-app-local.sendinblue.com:8070/",
    //     secure: false,
    //   },
    // ],

    /* If you want to server trafic through https domain */
    // https: {
    // 	key: fs.readFileSync('.docker/local/certs/integration.sendinblue.com-key.pem'),
    // 	cert: fs.readFileSync('.docker/local/certs/integration.sendinblue.com.pem'),
    // 	cacert: fs.readFileSync('.docker/local/certs/integration.sendinblue.com-key.pem'),
    // },
  },
  plugins: [
    new MFLiveReloadPlugin({
      port: 8093,
      container: "reactboilerplate",
    }),
  ],
  devtool: "eval-cheap-module-source-map",
};

commonConfig.module.rules.push({
  test: /\.(js|jsx)$/,
  use: {
    loader: "eslint-loader",
  },
  exclude: /node_modules/,
});

module.exports = merge(commonConfig, devConfig);
