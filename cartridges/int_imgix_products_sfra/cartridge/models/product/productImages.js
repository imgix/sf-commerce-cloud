"use strict";

var collections = require("*/cartridge/scripts/util/collections");
const currentSite = require("dw/system/Site").getCurrent();

/**
 * @constructor
 * @classdesc Returns images for a given product
 * @param {dw.catalog.Product} product - product to return images for
 * @param {Object} imageConfig - configuration object with image types
 */
function Images(product, imageConfig) {
  const imgixBaseURL =
    currentSite.getCustomPreferenceValue("imgixBaseURL") || "";
  const isBaseURLSet = imgixBaseURL.trim().length > 0;
  const imgixDefaultParams =
    currentSite.getCustomPreferenceValue("imgixProductDefaultParams") || "";
  const imgixEnableProductImageProxy = currentSite.getCustomPreferenceValue(
    "imgixEnableProductImageProxy"
  );

  /* The next section operates in one of three modes:
   * 1. if the imgixBaseURL is set, use that to render the images
   * 2. fallback to the built-in SF data
   */

  if (imgixEnableProductImageProxy && isBaseURLSet) {
    // 1. if the imgixBaseURL is set, use that to render the images

    imageConfig.types.forEach(function (type) {
      var images = product.getImages(type);
      var result = {};

      if (imageConfig.quantity === "single") {
        var firstImage = collections.first(images);
        if (firstImage) {
          let imageUrl =
            imgixBaseURL +
            firstImage.URL.toString() +
            (isBaseURLSet && imgixDefaultParams
              ? "?" + imgixDefaultParams
              : "");

          result = [
            {
              alt: firstImage.alt,
              url: imageUrl,
              title: firstImage.title,
              index: "0",
              absURL: imageUrl,
            },
          ];
        }
      } else {
        result = collections.map(images, function (image, index) {
          let imageUrl =
            imgixBaseURL +
            image.URL.toString() +
            (isBaseURLSet && imgixDefaultParams
              ? "?" + imgixDefaultParams
              : "");

          return {
            alt: image.alt,
            url: imageUrl,
            index: index.toString(),
            title: image.title,
            absURL: imageUrl,
          };
        });
      }
      this[type] = result;
    }, this);
  } else {
    // 2. fallback to the built-in SF data. Here we just pass through values.

    imageConfig.types.forEach(function (type) {
      var images = product.getImages(type);
      var result = {};

      if (imageConfig.quantity === "single") {
        var firstImage = collections.first(images);
        if (firstImage) {
          result = [
            {
              alt: firstImage.alt,
              url: firstImage.URL.toString(),
              title: firstImage.title,
              index: "0",
              absURL: firstImage.absURL.toString(),
            },
          ];
        }
      } else {
        result = collections.map(images, function (image, index) {
          return {
            alt: image.alt,
            url: image.URL.toString(),
            index: index.toString(),
            title: image.title,
            absURL: image.absURL.toString(),
          };
        });
      }
      this[type] = result;
    }, this);
  }
}

module.exports = Images;
