"use strict";
var URLUtils = require("dw/web/URLUtils");

module.exports.init = function (editor) {
  // Provide `baseUrl` to the static assets/content
  editor.configuration.put(
    "baseUrl",
    URLUtils.staticURL("/experience/editors/imgix/").https().toString()
  );
};
