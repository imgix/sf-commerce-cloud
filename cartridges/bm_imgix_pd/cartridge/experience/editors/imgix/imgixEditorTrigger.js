"use strict";

var HashMap = require("dw/util/HashMap");
var Resource = require("dw/web/Resource");
var PageMgr = require("dw/experience/PageMgr");
var currentSite = require("dw/system/Site").getCurrent();

module.exports.init = function (editor) {
  // Default values properties
  var defaults = {
    buttonBreakout: "Choose Image",
    titleBreakout: "Imgix Image",
    placeholder: "Choose Image",
    description: "Description of Image",
    group1: "",
  };
  var imgixApiDefaults = {
    apiKey: "",
    source: "",
  };

  var reducer = function (acc, key) {
    acc.put(
      key,
      Resource.msg(
        key,
        "experience.editors.imgix.imgixEditorTrigger",
        defaults[key]
      )
    );
    return acc;
  };

  // Add some localizations
  var localization = Object.keys(defaults).reduce(reducer, new HashMap());
  editor.configuration.put("localization", localization);

  // Add some api defaults
  var imgixApi = Object.keys(imgixApiDefaults).reduce(reducer, new HashMap());
  editor.configuration.put("imgixApi", imgixApi);

  // Pass through property `options.config` from the `attribute_definition` to be used in a breakout editor
  var options = new HashMap();
  options.put("config", editor.configuration.options.config);

  // Create a configuration for a custom editor to be displayed in a modal breakout dialog (breakout editor)
  var breakoutEditorConfig = new HashMap();
  imgixApi["apiKey"] = currentSite.getCustomPreferenceValue(
    "imgixApiKey"
  );

  breakoutEditorConfig.put("localization", localization);
  breakoutEditorConfig.put("api", imgixApi);
  breakoutEditorConfig.put("options", options);

  // Add a dependency to the configured breakout editor
  var breakoutEditor = PageMgr.getCustomEditor(
    "imgix.imgixEditorTriggerBreakout",
    breakoutEditorConfig
  );
  editor.dependencies.put("imgixEditorBreakoutScript", breakoutEditor);
};
