"use strict";

import { IImgixCustomAttribute } from "../../../../commonTypes";
import { ProductImagesModelData } from "../../../../SFTypes";

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
function Images(
  this: ProductImagesModelData,
  product: {
    selectedVariant: any;
    master: any;
    custom: { imgixData: string };
    getImages: (arg0: any) => any;
  },
  imageConfig: { types: any[]; quantity: string }
) {
  const imgixBaseURL =
    currentSite.getCustomPreferenceValue("imgixBaseURL") || "";
  const isBaseURLSet = imgixBaseURL.trim().length > 0;
  const imgixDefaultParams =
    currentSite.getCustomPreferenceValue("imgixProductDefaultParams") || "";
  const imgixEnableProductImageProxy = currentSite.getCustomPreferenceValue(
    "imgixEnableProductImageProxy"
  );

  const imgixCustomAttributeData: IImgixCustomAttribute | undefined = (() => {
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

  const hasCustomImages: boolean = Boolean(
    imgixCustomAttributeData?.images &&
      imgixCustomAttributeData.images.length > 0
  );

  /* The next section operates in one of three modes:
   * 1. if custom attribute data exists, use that to render the images (as this
   *    overrides the built-in SF data)
   * 2. otherwise, if the imgixBaseURL is set, use that to render the images
   * 3. fallback to the built-in SF data
   */

  if (
    imgixEnableProductImageProxy &&
    imgixCustomAttributeData &&
    hasCustomImages
  ) {
    // 1. custom attribute data exists

    imageConfig.types.forEach(function (
      this: ProductImagesModelData,
      viewType: string | number
    ) {
      const images = (() => {
        if (imageConfig.quantity === "single") {
          return imgixCustomAttributeData.images.slice(0, 1);
        }
        return imgixCustomAttributeData.images;
      })();

      const result = images.map((image, index) => {
        const rawURL = image.src;

        // TODO: add tests for default params
        const imageURL =
          rawURL + (imgixDefaultParams ? "?" + imgixDefaultParams : "");

        return {
          alt: image.alt,
          url: imageURL,
          index: index.toString(),
          title: image.title,
          absURL: imageURL,
          rawURL,
        };
      });
      this[viewType] = result;
    },
    this);
  } else if (imgixEnableProductImageProxy && isBaseURLSet) {
    // 2. if the imgixBaseURL is set, use that to render the images

    imageConfig.types.forEach(function (
      this: ProductImagesModelData,
      type: string | number
    ) {
      var images = product.getImages(type);
      var result = {};

      if (imageConfig.quantity === "single") {
        var firstImage = collections.first(images);
        if (firstImage) {
          const rawURL = imgixBaseURL + firstImage.URL.toString();
          const imageURL =
            rawURL +
            (isBaseURLSet && imgixDefaultParams
              ? "?" + imgixDefaultParams
              : "");

          result = [
            {
              alt: firstImage.alt,
              url: imageURL,
              title: firstImage.title,
              index: "0",
              absURL: imageURL,
              rawURL,
            },
          ];
        }
      } else {
        result = collections.map(
          images,
          function (
            image: { URL: { toString: () => any }; alt: any; title: any },
            index: { toString: () => any }
          ) {
            const rawURL = imgixBaseURL + image.URL.toString();
            const imageURL =
              rawURL + (imgixDefaultParams ? "?" + imgixDefaultParams : "");

            return {
              alt: image.alt,
              url: imageURL,
              index: index.toString(),
              title: image.title,
              absURL: imageURL,
              rawURL,
            };
          }
        );
      }
      this[type] = result;
    },
    this);
  } else {
    // 3. fallback to the built-in SF data. Here we just pass through values.

    imageConfig.types.forEach(function (
      this: ProductImagesModelData,
      type: string | number
    ) {
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
        result = collections.map(
          images,
          function (
            image: {
              alt: any;
              URL: { toString: () => any };
              title: any;
              absURL: { toString: () => any };
            },
            index: { toString: () => any }
          ) {
            return {
              alt: image.alt,
              url: image.URL.toString(),
              index: index.toString(),
              title: image.title,
              absURL: image.absURL.toString(),
            };
          }
        );
      }
      this[type] = result;
    },
    this);
  }
}

module.exports = Images;
