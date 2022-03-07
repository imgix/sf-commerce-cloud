"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImgixCore = __importStar(require("../../scripts/imgix/imgix"));
var collections = require("*/cartridge/scripts/util/collections");
var currentSite = require("dw/system/Site").getCurrent();
var ProductVariationModel = require("dw/catalog/ProductVariationModel");
var Variant = require("dw/catalog/Variant");
var Product = require("dw/catalog/Product");
var IMGIX_CORE_DEFAULT_PARAMS = {
    ixlib: "sf-22.2.0",
};
var IMGIX_CORE_DEFAULT_OPTIONS = {
    includeLibraryParam: false,
};
/**
 * @constructor
 * @classdesc Returns images for a given product
 * @param {dw.catalog.Product} product - product to return images for
 * @param {Object} imageConfig - configuration object with image types
 */
function Images(product, imageConfig) {
    var imgixBaseURL = currentSite.getCustomPreferenceValue("imgixBaseURL") || "";
    var isBaseURLSet = imgixBaseURL.trim().length > 0;
    var imgixDefaultParamsString = currentSite.getCustomPreferenceValue("imgixProductDefaultParams") || "";
    var imgixDefaultParams = imgixDefaultParamsString
        .split("&")
        .reduce(function (p, paramString) {
        var equalsIndex = paramString.indexOf("=");
        if (equalsIndex < 0) {
            return p;
        }
        var key = paramString.substring(0, equalsIndex);
        var value = paramString.substring(equalsIndex + 1);
        p[key] = value;
        return p;
    }, {});
    var imgixEnableProductImageProxy = currentSite.getCustomPreferenceValue("imgixEnableProductImageProxy");
    var imgixCustomAttributeData = (function () {
        if (product instanceof ProductVariationModel) {
            // Get imgix data custom attribute from selected variant or master product
            var productData = product.selectedVariant || product.master;
            return (productData &&
                productData.custom &&
                productData.custom.imgixData &&
                JSON.parse(productData.custom.imgixData));
        }
        else if (product instanceof Variant || product instanceof Product) {
            return (product.custom &&
                product.custom.imgixData &&
                JSON.parse(product.custom.imgixData));
        }
        return undefined;
    })();
    var hasCustomImages = Boolean((imgixCustomAttributeData === null || imgixCustomAttributeData === void 0 ? void 0 : imgixCustomAttributeData.images) &&
        imgixCustomAttributeData.images.length > 0);
    /* The next section operates in one of three modes:
     * 1. if custom attribute data exists, use that to render the images (as this
     *    overrides the built-in SF data)
     * 2. otherwise, if the imgixBaseURL is set, use that to render the images
     * 3. fallback to the built-in SF data
     */
    if (imgixEnableProductImageProxy &&
        imgixCustomAttributeData &&
        hasCustomImages) {
        // 1. custom attribute data exists
        imageConfig.types.forEach(function (viewType) {
            var images = (function () {
                if (imageConfig.quantity === "single") {
                    return imgixCustomAttributeData.images.slice(0, 1);
                }
                return imgixCustomAttributeData.images;
            })();
            var result = images.map(function (image, index) {
                var rawURL = image.src;
                var sizeParams = (function () {
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
                })();
                // TODO: add tests for default params
                var imageURL = ImgixCore.buildURL(rawURL, __assign(__assign(__assign({}, IMGIX_CORE_DEFAULT_PARAMS), imgixDefaultParams), sizeParams), IMGIX_CORE_DEFAULT_OPTIONS);
                return {
                    alt: image.alt,
                    url: imageURL,
                    index: index.toString(),
                    title: image.title,
                    absURL: imageURL,
                    rawURL: rawURL,
                };
            });
            this[viewType] = result;
        }, this);
    }
    else if (imgixEnableProductImageProxy && isBaseURLSet) {
        // 2. if the imgixBaseURL is set, use that to render the images
        imageConfig.types.forEach(function (type) {
            var images = product.getImages(type);
            var result = {};
            if (imageConfig.quantity === "single") {
                var firstImage = collections.first(images);
                if (firstImage) {
                    var rawURL = imgixBaseURL + firstImage.URL.toString();
                    var imgixParams = __assign(__assign({}, IMGIX_CORE_DEFAULT_PARAMS), imgixDefaultParams);
                    var imageURL = ImgixCore.buildURL(rawURL, imgixParams, IMGIX_CORE_DEFAULT_OPTIONS);
                    result = [
                        {
                            alt: firstImage.alt,
                            url: imageURL,
                            title: firstImage.title,
                            index: "0",
                            absURL: imageURL,
                            rawURL: rawURL,
                        },
                    ];
                }
            }
            else {
                result = collections.map(images, function (image, index) {
                    var rawURL = imgixBaseURL + image.URL.toString();
                    var imgixParams = __assign(__assign({}, IMGIX_CORE_DEFAULT_PARAMS), imgixDefaultParams);
                    var imageURL = ImgixCore.buildURL(rawURL, imgixParams, IMGIX_CORE_DEFAULT_OPTIONS);
                    return {
                        alt: image.alt,
                        url: imageURL,
                        index: index.toString(),
                        title: image.title,
                        absURL: imageURL,
                        rawURL: rawURL,
                    };
                });
            }
            this[type] = result;
        }, this);
    }
    else {
        // 3. fallback to the built-in SF data. Here we just pass through values.
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
            }
            else {
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
