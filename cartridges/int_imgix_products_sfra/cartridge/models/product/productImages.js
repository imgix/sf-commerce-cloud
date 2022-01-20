"use strict";

var collections = require("*/cartridge/scripts/util/collections");
const currentSite = require("dw/system/Site").getCurrent();
const ProductVariationModel = require("dw/catalog/ProductVariationModel");
const Variant = require("dw/catalog/Variant");
const Product = require("dw/catalog/Product");

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

  const imgixCustomAttributeData = (() => {
    if (product instanceof ProductVariationModel) {
      // Get imgix data custom attribute from selected variant or master product
      const productData = product.selectedVariant || product.master;
      return (
        productData &&
        productData.custom &&
        productData.custom.imgixData &&
        JSON.parse(productData.custom.imgixData)
      );
    } else if (product instanceof Variant || product instanceof Product) {
      return (
        product.custom &&
        product.custom.imgixData &&
        JSON.parse(product.custom.imgixData)
      );
    }
    return undefined;
  })();

  /* The next section operates in one of three modes:
   * 1. if custom attribute data exists, use that to render the images (as this
   *    overrides the built-in SF data)
   * 2. otherwise, if the imgixBaseURL is set, use that to render the images
   * 3. fallback to the built-in SF data
   */

  if (imgixCustomAttributeData) {
    imageConfig.types.forEach(function (type) {
      var images = product.getImages(type);
      var result = {};

      if (imageConfig.quantity === "single") {
        var firstImage = collections.first(images);
        if (firstImage) {
          let imageUrl =
            imgixCustomAttributeData.images.primary.src +
            (imgixDefaultParams ? "?" + imgixDefaultParams : "");
          // TODO: update sourceWidth adding
          imageUrl = appendSourceWidth(
            imageUrl,
            imgixCustomAttributeData.images.primary.sourceWidth
          );

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
          let imageUrl;
          if (index === 0) {
            // TODO: add tests for default params
            imageUrl =
              imgixCustomAttributeData.images.primary.src +
              (imgixDefaultParams ? "?" + imgixDefaultParams : "");
            // TODO: update sourceWidth adding
            imageUrl = appendSourceWidth(
              imageUrl,
              imgixCustomAttributeData.images.primary.sourceWidth
            );
          } else {
            const imageIndex = index - 1;
            if (
              imageIndex < imgixCustomAttributeData.images.alternatives.length
            ) {
              // TODO: add tests for default params
              imageUrl =
                imgixCustomAttributeData.images.alternatives[imageIndex].src +
                (isBaseURLSet && imgixDefaultParams
                  ? "?" + imgixDefaultParams
                  : "");
              // TODO: update sourceWidth adding
              imageUrl = appendSourceWidth(
                imageUrl,
                imgixCustomAttributeData.images.alternatives[imageIndex]
                  .sourceWidth
              );
            }
          }

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
  } else if (isBaseURLSet) {
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
    // Here we just pass through values
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

/**
 * Append source width
 * @param {String} imageUrl - Image Url
 * @param {Number} sourceWidth - Source width
 * @returns {String} Image Url
 */
function appendSourceWidth(imageUrl, sourceWidth) {
  if (sourceWidth) {
    imageUrl += imageUrl.indexOf("?") !== -1 ? "&" : "?";
    imageUrl += "sourceWidth=" + sourceWidth;
  }

  return imageUrl;
}

module.exports = Images;
