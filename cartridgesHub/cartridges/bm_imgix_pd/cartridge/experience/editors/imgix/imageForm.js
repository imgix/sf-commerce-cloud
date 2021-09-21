"use strict";

var HashMap = require("dw/util/HashMap");
var imgixApi = require("*/cartridge/scripts/imgix/imgixApi");
var URLUtils = require("dw/web/URLUtils");
var URLAction = require("dw/web/URLAction");
var Site = require("dw/system/Site");
var CSRF = require("dw/web/CSRFProtection");

module.exports.init = function (editor) {
  var conf = new HashMap();
  var csrf = new HashMap();
  csrf.put(CSRF.getTokenName(), CSRF.generateToken());
  editor.configuration.put("csrf", csrf);
  conf.put("type", "image");
  editor.configuration.put("apiKey", imgixApi.data.getAPIKey());
  editor.configuration.put("pathName", imgixApi.data.getPathname());
};
