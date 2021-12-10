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

  if (isBaseURLSet) {
    // Here we transform the URL
    let imgixJsonImages = null;

    if (product instanceof ProductVariationModel) {
      // Get imgix data custom attribute from selected variant or master product
      const productData = product.selectedVariant || product.master;
      imgixJsonImages =
        productData &&
        productData.custom &&
        productData.custom.imgixData &&
        JSON.parse(productData.custom.imgixData);
    } else if (product instanceof Variant || product instanceof Product) {
      imgixJsonImages =
        product.custom &&
        product.custom.imgixData &&
        JSON.parse(product.custom.imgixData);
    }

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
          if (imgixJsonImages) {
            // TODO: add tests for default params
            imageUrl =
              imgixJsonImages.images.primary.src +
              (imgixDefaultParams ? "?" + imgixDefaultParams : "");
          }

          result = [
            {
              alt: firstImage.alt,
              url: imageUrl,
              title: firstImage.title,
              index: "0",
              absURL: firstImage.absURL.toString(),
            },
          ];
        }
      } else {
        let imageUrl =
          imgixBaseURL +
          image.URL.toString() +
          (isBaseURLSet && imgixDefaultParams ? "?" + imgixDefaultParams : "");
        if (imgixJsonImages) {
          if (index === 0) {
            // TODO: add tests for default params
            imageUrl =
              imgixJsonImages.images.primary.src +
              (isBaseURLSet && imgixDefaultParams
                ? "?" + imgixDefaultParams
                : "");
          } else {
            const imageIndex = index - 1;
            if (imageIndex < imgixJsonImages.images.alternatives.length) {
              // TODO: add tests for default params
              imageUrl =
                imgixJsonImages.images.alternatives[imageIndex].src +
                (isBaseURLSet && imgixDefaultParams
                  ? "?" + imgixDefaultParams
                  : "");
            }
          }
        }

        result = collections.map(images, function (image, index) {
          return {
            alt: image.alt,
            url: imageUrl,
            index: index.toString(),
            title: image.title,
            absURL: image.absURL.toString(),
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
            url: firstImage.URL.toString(),
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
