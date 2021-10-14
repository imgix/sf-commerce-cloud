"use strict";

/**
 * Init for the sidebar component for image selection
 *
 * Initialises the custom attribute editor with server side information.
 */
var HashMap = require("dw/util/HashMap");
var URLUtils = require("dw/web/URLUtils");
var URLAction = require("dw/web/URLAction");
var Site = require("dw/system/Site");
var CSRFProtection = require("dw/web/CSRFProtection");
var Logger = require("dw/system/Logger");

module.exports.init = function (editor) {
  var conf = new HashMap();
  var csrf = new HashMap();
  csrf.put(CSRFProtection.getTokenName(), CSRFProtection.generateToken());
  var currentSite = Site.getCurrent();
  var act = new URLAction("Brpoints-Points", currentSite.getID());
  var linkUrlAct = new URLAction("Links-url", currentSite.getID());
  editor.configuration.put("breakpointsUrl", URLUtils.abs(act).toString());
  editor.configuration.put(
    "linkBuilderUrl",
    URLUtils.abs(linkUrlAct).toString()
  );
  editor.configuration.put("csrf", csrf);
  conf.put("type", "image");
};
