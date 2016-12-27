
const Os = require('os');
const Path = require('path');

const webpackConfig = require('./webpack.config');
const tempDir = Path.join(Os.tmpdir(), `chrome-test`) ;
const isTravis = !!process.env.TRAVIS;
const singleRun = isTravis;
const autoWatch = !isTravis;

module.exports = function(config) {
  config.set({
    browsers: [isTravis ? 'ChromeLauncherTravis' : 'ChromeLauncher'],
    customLaunchers: {
      ChromeLauncher: {
        base: 'Chrome',
        flags: ['--start-maximized', `--user-data-dir=${tempDir}`]
      },
      ChromeLauncherTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--start-maximized', `--user-data-dir=${tempDir}`]
      },
    },
    frameworks: ['jasmine'],
    files: [
      { pattern: './spec/**/*.js', watched: false },
      { pattern: './spec/**/*.json', watched: false, included: false, served: true },
    ],
    preprocessors: {
      './spec/**/*.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-jasmine'
    ],
    reporters: ['progress'],
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch,
    singleRun,
    concurrency: Infinity,
    retryLimit: 5
  })
};
