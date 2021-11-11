"use strict";
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var Logger = require("dw/system/Logger");
var ImgixClient = require("*/cartridge/scripts/jsCore/jsCore");

// handle function for component.
module.exports.render = function (context, modelIn) {
  const ImgixLogger = Logger.getLogger("imgix");
  ImgixLogger.info(
    "************************** imgix Image Component Start Render"
  );

  var model = modelIn || new HashMap();
  var content = context.content;

  const ixlib = "sfccPD";

  // use to give link on the image, if we click on image it take to us to that page.
  model.link = content.imageLink ? content.imageLink : "#";
  model.alt = content.alt ? content.alt : null;
  const rawImageUrl =
    content.image_url || "https://assets.imgix.net/amsterdam.jpg?w=500";
  model.image_src = ImgixClient._buildURL(rawImageUrl, {
    auto: "format,compress",
    ixlib: ixlib,
  });
  model.image_srcset = ImgixClient._buildSrcSet(rawImageUrl, {
    auto: "format,compress",
    ixlib: ixlib,
  });
  model.image_sizes = content.sizes;

  return new Template("/experience/components/imgix/imageComponent").render(
    model
  ).text;
};
