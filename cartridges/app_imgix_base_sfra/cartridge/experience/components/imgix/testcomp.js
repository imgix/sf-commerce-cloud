"use strict";
// These all are SFCC APIs
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
// we included an existing SFCC back-end script to handle the image path
var ImageTransformation = require("*/cartridge/experience/utilities/ImageTransformation.js");
// Logging class used for debugging
var log = require("dw/system").Logger.getLogger("imgix", "");

// handle function for component.
module.exports.render = function (context, modelIn) {
  var model = modelIn || new HashMap();
  var content = context.content;

  // let contentStr = `${content.title}:${content.image}:${content.link}:${content.alt}`;

  model.title = content.title ? content.title : null;
  model.image = ImageTransformation.getScaledImage(content.image);
  // use to give link on the image, if we click on image it take to us to that page.
  model.link = content.ITCLink ? content.imageLink : "#";
  model.alt = content.alt ? content.alt : null;

  // log.warn("content: {0}", contentStr);
  // log.warn("model title: {0}", model.title);
  // log.warn("model image: {0}", model.image);
  // log.warn("model link: {0}", model.link);
  // log.warn("model alt: {0}", model.alt);

  return new Template("/imgix/image/imgerender/imagerender").render(model).text;
};
