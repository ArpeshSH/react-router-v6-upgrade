/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
// ========================================================
// Default Configuration
// ========================================================

const config = {
  name: '${{values.slug}}',
  env: process.env.APP_ENV || 'production',
  isAnalyze: process.env.BUNDLE_ANALYZE || false,
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'app',
  dir_dist: 'dist/',
  dir_server: 'server',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0',
  allowed_hosts: [
    // custom domains
    // 'inbox.sendinblue.com',
    'localhost',
    '0.0.0.0'
  ],
  server_port: process.env.PORT || 3003,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  // compiler_babel: {
  // 	cacheDirectory: './.temp/',
  // 	inputSourceMap: true,
  // },
  // https://webpack.js.org/guides/build-performance/#devtool
  compiler_devtool: 'cheap-module-eval-source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: process.env.PUBLIC_PATH || 'publicpath',
  compiler_stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    colors: true
  },
  compiler_eslint: {
    configFile: '.eslintrc.js',
    emitWarning: true,
    emitError: true,
    failOnError: false,
    cache: false
  }
}

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc

const basePath = `${config.path_base}/.env`
const envPath = `${basePath}.${config.env}`
const finalPath = fs.existsSync(envPath) ? envPath : basePath
const fileEnv = dotenv.config({ path: finalPath }).parsed
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[next] = JSON.stringify(fileEnv[next])
  return prev
}, {})

config.globals = {
  ...envKeys
}

// ------------------------------------
// Utilities
// ------------------------------------
function base(...args) {
  return path.resolve(config.path_base, ...args)
}

config.utils_paths = {
  base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist)
}

module.exports = config
