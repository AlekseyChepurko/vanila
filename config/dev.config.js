const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const initConfig = require('./common.config');

module.exports = function (options) {
  const config = initConfig(options);
  const plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new webpack.DefinePlugin({
    }),
  ];

  const rules = [
    ...config.rules,
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader?importLoader=1&modules&localIdentName=[local]',
        'import-glob-loader',
      ],
    },
  ];

  return { rules, plugins };
};
