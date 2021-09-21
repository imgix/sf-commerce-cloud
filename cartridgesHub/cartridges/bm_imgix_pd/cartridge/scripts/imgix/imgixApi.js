"use strict";

var Logger = require("dw/system/Logger");
var currentSite = require("dw/system/Site").getCurrent();

var data = {
  getAPIKey: function () {
    return currentSite.getCustomPreferenceValue("ImgixAPIkey");
  },
  getPathName: function () {
    Logger.error("requested imgix pathname");
  },
};

module.exports.data = data;
