"use strict";
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var Logger = require("dw/system/Logger");
var ImgixClient = require("*/cartridge/scripts/jsCore/jsCore");
var version = require("*/cartridge/scripts/imgix/version.json");
const currentSite = require('dw/system/Site').getCurrent();
// handle function for component.
module.exports.render = function (context, modelIn) {
  const ImgixLogger = Logger.getLogger("imgix");
  ImgixLogger.info(
    "************************** imgix Image Component Start Render"
  );
  const imgixApiKey = currentSite.getCustomPreferenceValue('imgixPageDesignerAPIkey');
  // TODO: to be passed down from site settings
  const defaultParams = `auto=format,compress&fit=crop&apiKey=${imgixApiKey}`;

  const defaultParamsJSON = defaultParams.split("&").reduce(function (p, v) {
    const [queryParamKey, queryParamValue] = v.split("=");
    p[queryParamKey] = queryParamValue;
    return p;
  }, {});

  var model = modelIn || new HashMap();
  var content = context.content;

  const ixlib = "sfccPD-" + version.version;

  // use to give link on the image, if we click on image it take to us to that page.
  model.link = content.imageLink ? content.imageLink : "#";
  model.alt = content.alt ? content.alt : null;
  const rawImageUrl =
    content.image_url || "https://assets.imgix.net/amsterdam.jpg?w=500";
  model.image_src = ImgixClient._buildURL(
    rawImageUrl,
    Object.assign({}, defaultParamsJSON, {
      auto: "format,compress",
    }),
    {
      includeLibraryParam: false,
      libraryParam: ixlib,
    }
  );
  model.image_srcset = ImgixClient._buildSrcSet(
    rawImageUrl,
    Object.assign({}, defaultParamsJSON, {
      auto: "format,compress",
    }),
    {
      includeLibraryParam: false,
      libraryParam: ixlib,
    }
  );
  model.image_sizes = content.sizes;

  return new Template("/experience/components/imgix/imageComponent").render(
    model
  ).text;
};
