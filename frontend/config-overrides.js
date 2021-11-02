module.exports = function override(config, env) {
  config.output = {
    ...config.output, // copy all settings
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
  };
  config.output.filename = "sidebar.js";
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;
  return config;
};
