"use strict";
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var Logger = require("dw/system/Logger");

// handle function for component.
module.exports.render = function (context, modelIn) {
  const ImgixLogger = Logger.getLogger("imgix");
  ImgixLogger.info(
    "************************** imgix Image Component Start Render"
  );

  var model = modelIn || new HashMap();
  var content = context.content;

  // use to give link on the image, if we click on image it take to us to that page.
  model.link = content.imageLink ? content.imageLink : "#";
  model.alt = content.alt ? content.alt : null;
  model.image_src = "https://assets.imgix.net/amsterdam.jpg?w=500";

  return new Template("/experience/components/imgix/imageComponent").render(
    model
  ).text;
};
