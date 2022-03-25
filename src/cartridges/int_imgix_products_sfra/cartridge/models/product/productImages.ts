"use strict";

import { IImgixCustomAttribute } from "../../../../commonTypes";
import { ProductImagesModelData } from "../../../../SFTypes";
import * as ImgixCore from "../../scripts/imgix/imgix";

var collections = require("*/cartridge/scripts/util/collections");
const currentSite = require("dw/system/Site").getCurrent();
const ProductVariationModel = require("dw/catalog/ProductVariationModel");
const Variant = require("dw/catalog/Variant");
const Product = require("dw/catalog/Product");

const IMGIX_CORE_DEFAULT_PARAMS = {
  ixlib: "sf-22.2.0",
};
const IMGIX_CORE_DEFAULT_OPTIONS = {
  includeLibraryParam: false,
};

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
  // Store the imgixAttributes custom preference group values for the current site
  const imgixBaseURL: string =
    currentSite.getCustomPreferenceValue("imgixBaseURL") || "";
  const imgixEnableProductImageProxy: boolean =
    currentSite.getCustomPreferenceValue("imgixEnableProductImageProxy");
  const imgixDefaultParamsString: string =
    currentSite.getCustomPreferenceValue("imgixProductDefaultParams") || "";

  // Create imgix params object from imgixDefaultParamsString custom preference
  const imgixDefaultParams = imgixDefaultParamsString
    .split("&")
    .reduce((p, paramString: string) => {
      const equalsIndex = paramString.indexOf("=");
      if (equalsIndex < 0) {
        return p;
      }
      const key = paramString.substring(0, equalsIndex);
      const value = paramString.substring(equalsIndex + 1);
      p[key] = value;
      return p;
    }, {} as Record<string, string>);

  // Determine if baseURL string was provided
  const isBaseURLSet: boolean = imgixBaseURL.trim().length > 0;

  /**
   * Parse imgixData custom attribute JSON string into an object if it exists.
   * Depending on whether the product is an instance of ProductVariationModel or
   * Variant or Product , the imgixData custom attribute will be nested
   * differently.
   */
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

  /**
   * Returns both the original image URL and transformed image URL. The
   * transformed image URL is used for the src attribute of an img. The original
   * image URL is used for the srcset attribute of an img.
   * @param image - ProductImage object
   * @param imgixParams - imgix params object
   * @param options - imgix options object
   * @returns {Object} object with `rawUrl` and `imageUrl` properties. `rawURL`
   * is the image URL without any imgix transformations. `imageUrl` is the image
   * URL with imgix transformations.
   */
  const buildImageURLs = (
    image: any,
    imgixParams: Record<string, any>,
    options: Record<string, any>
  ) => {
    let rawURL: string;
    if (!image.URL) {
      // custom attribute images don't use the imgixBaseURL string.
      rawURL = image.src;
    } else {
      rawURL = imgixBaseURL + image.URL.toString();
    }
    const imageURL = ImgixCore.buildURL(rawURL, imgixParams, options);
    return { rawURL, imageURL };
  };

  /**
   * Combines the imgix core, custom attribute default params, and the size
   * params into one object.
   * @param sizeParams - size params object
   * @returns {Object} merged core, product default, and size params objects
   * @example { "w": "100", "h": "100", "fit": "crop", "ixlib": "sf-22.2.0"}
   */
  const buildImgixParams = (sizeParams?: { w?: number; h?: number }) => {
    return {
      ...IMGIX_CORE_DEFAULT_PARAMS,
      ...imgixDefaultParams,
      ...sizeParams,
    };
  };

  /**
   * Returns a sizes params object for a given image type. Used to generate
   * images of fixed sizes for custom attribute images. This is done to match
   * SFCC image sizes and behavior. The sizes object is not generate for proxied
   * images.
   * @param viewType - view type string, "large" or "medium" or "small"
   * @returns {Object} sizes object, `{w: number, h: number}`, for the given
   * view type.
   */
  const buildSizes = (viewType: string | number) => {
    if (!hasCustomImages) {
      return {};
    }
    if (viewType === "large") {
      return { w: 800, h: 800 };
    }
    if (viewType === "medium") {
      return { w: 400, h: 400 };
    }
    if (viewType === "small") {
      return { w: 140, h: 140 };
    }
    return {};
  };

  /**
   * Modifies product image model data to include imgix params and options.
   * @param viewType - view type string, "large" or "medium" or "small"
   * @param image - ProductImage object
   * @param index - index of image in array
   * @returns `ProductImageModel` with modified properties.
   */
  const buildImage = (viewType: string | number, image: any, index: string) => {
    const sizeParams = buildSizes(viewType);
    const imgixParams = buildImgixParams(sizeParams);
    const options = { ...IMGIX_CORE_DEFAULT_OPTIONS };
    const { rawURL, imageURL } = buildImageURLs(image, imgixParams, options);

    const srcSet = isBaseURLSet
      ? ImgixCore.buildSrcSet(
          rawURL,
          imgixParams,
          {},
          IMGIX_CORE_DEFAULT_OPTIONS
        )
      : "";

    return {
      alt: image.alt,
      url: imageURL,
      index: index.toString(),
      title: image.title,
      absURL: imageURL,
      rawURL,
      srcSet,
    };
  };

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
        return buildImage(viewType, image, index.toString());
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
          result = [buildImage(type, firstImage, "0")];
        }
      } else {
        result = collections.map(
          images,
          function (
            image: { URL: { toString: () => any }; alt: any; title: any },
            index: { toString: () => any }
          ) {
            return buildImage(type, image, index.toString());
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
