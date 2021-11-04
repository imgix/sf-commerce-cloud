'use strict';

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');

/**
 * Render logic for storefront.productBannerStrip component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */

module.exports.render = function (context) {
  const content = context.content;
  const model = new HashMap();
  model.imgUrl = content.image ? content.image.absURL : null;
  model.imgAlt = content.alt;

  return new Template('experience/components/imgix/imgixImage').render(model).text;
};
