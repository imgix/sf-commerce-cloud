const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function override(config, env) {
  console.log(env);
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  const appName = process.env.REACT_APP_APP_TYPE || "react";
  config.optimization.runtimeChunk = false;
  config.output.filename = `js/${appName}.js`;
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: `css/${appName}.css`,
    })
  );
  return config;
};
