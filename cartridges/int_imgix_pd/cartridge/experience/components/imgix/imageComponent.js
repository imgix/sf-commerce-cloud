"use strict";
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var Logger = require("dw/system/Logger");
var ImgixClient = require("*/cartridge/scripts/jsCore/jsCore");
var version = require("*/cartridge/scripts/imgix/version.json");
var Site = require("dw/system/Site");

// handle function for component.
module.exports.render = function (context, modelIn) {
  const ImgixLogger = Logger.getLogger("imgix");
  ImgixLogger.info(
    "************************** imgix Image Component Start Render"
  );
  const isEnabled = Site.getCurrent().getCustomPreferenceValue(
    "imgixEnablePageDesigner"
  );

  if (!isEnabled) {
    ImgixLogger.info(
      "************************** imgix Image Component Render Aborted"
    );
    return;
  }

  var model = modelIn || new HashMap();
  var content = context.content;

  let defaultParams =
    Site.getCurrent().getCustomPreferenceValue("imgixDefaultParams");

  // if default params string is empty or null, return empty string
  if (!defaultParams) {
    ImgixLogger.info(
      "************************** imgix Image Component Not Provided Default Params"
    );
    defaultParams = "";
  }

  const defaultParamsJSON = defaultParams.split("&").reduce(function (p, v) {
    const [queryParamKey, queryParamValue] = v.split("=");
    p[queryParamKey] = queryParamValue;
    return p;
  }, {});

  // The context.___ != null && {} is needed here because otherwise undefined values would overwrite the defaults below.
  const customImgixParams = Object.assign(
    {},
    content.width != null && { w: content.width },
    content.height != null && { h: content.height },
    content.fm != null && { fm: content.fm },
    content.auto != null && { auto: content.auto },
    content.fit != null && { fit: content.fit }
  );

  const fixedSize = content.width != null;

  const ixlib = "sfccPD-" + version.version;

  const mediaWidth = content.image_data.mediaWidth;

  // use to give link on the image, if we click on image it take to us to that page.
  model.alt = content.alt ? content.alt : null;
  model.anchorTagUrl = content.anchorTagUrl ? content.anchorTagUrl : "";

  const rawImageUrl = content.image_data && content.image_data.src;

  if (rawImageUrl) {
    model.image_src = ImgixClient._buildURL(
      rawImageUrl,
      Object.assign({}, defaultParamsJSON, customImgixParams),
      {
        includeLibraryParam: false,
        libraryParam: ixlib,
      }
    );
    // ImgixClient._buildSrcSet will make sure the srcset is a dpr srcset if w or h is provided
    model.image_srcset = ImgixClient._buildSrcSet(
      rawImageUrl,
      Object.assign({}, defaultParamsJSON, customImgixParams),
      Object.assign({}, mediaWidth && { maxWidth: mediaWidth }),
      {
        includeLibraryParam: false,
        libraryParam: ixlib,
      }
    );
    if (!fixedSize) {
      model.image_sizes = content.sizes;
    }
  }

  return new Template("/experience/components/imgix/imageComponent").render(
    model
  ).text;
};
