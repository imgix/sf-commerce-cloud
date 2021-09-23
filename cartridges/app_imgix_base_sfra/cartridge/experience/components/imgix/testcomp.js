"use strict";
// These all are SFCC APIs
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
// we included an existing SFCC back-end script to handle the image path
var ImageTransformation = require("*/cartridge/experience/utilities/ImageTransformation.js");

// handle function for component.
module.exports.render = function (context, modelIn) {
  var model = modelIn || new HashMap();
  var content = context.content;

  model.title = content.title ? content.title : null;
  model.image = ImageTransformation.getScaledImage(content.image);
  // use to give link on the image, if we click on image it take to us to that page.
  model.link = content.imageLink ? content.imageLink : "#";
  model.alt = content.alt ? content.alt : null;

  return new Template("/imgix/image/imgerender/imagerender").render(model).text;
};
