'use strict';

var collections = require('*/cartridge/scripts/util/collections');
const currentSite = require('dw/system/Site').getCurrent();
const ProductVariationModel = require('dw/catalog/ProductVariationModel');
const Variant = require('dw/catalog/Variant');
const Product = require('dw/catalog/Product');

/**
 * @constructor
 * @classdesc Returns images for a given product
 * @param {dw.catalog.Product} product - product to return images for
 * @param {Object} imageConfig - configuration object with image types
 */
function Images(product, imageConfig) {
    const imgixBaseURL = currentSite.getCustomPreferenceValue('imgixBaseURL') || '';
    let imgixJsonImages = null;

    if (product instanceof ProductVariationModel) {
        // Get imgix data custom attribute from selected variant or master product
        const productData = product.selectedVariant || product.master;
        imgixJsonImages = productData && productData.custom && productData.custom.imgixData && JSON.parse(productData.custom.imgixData);
    } else if (product instanceof Variant || product instanceof Product) {
        imgixJsonImages = product.custom && product.custom.imgixData && JSON.parse(product.custom.imgixData);
    }

    imageConfig.types.forEach(function (type) {
        var images = product.getImages(type);
        var result = {};

        if (imageConfig.quantity === 'single') {
            var firstImage = collections.first(images);
            if (firstImage) {
                let imageUrl = imgixBaseURL + firstImage.URL.toString();
                if (imgixJsonImages) {
                    imageUrl = imgixJsonImages.images.primary.src;
                    imageUrl = appendSourceWidth(imageUrl, imgixJsonImages.images.primary.sourceWidth);
                }
                result = [{
                    alt: firstImage.alt,
                    url: imageUrl,
                    title: firstImage.title,
                    index: '0',
                    absURL: firstImage.absURL.toString()
                }];
            }
        } else {
            result = collections.map(images, function (image, index) {
                let imageUrl = imgixBaseURL + image.URL.toString();
                if (imgixJsonImages) {
                    if (index === 0) {
                        imageUrl = imgixJsonImages.images.primary.src;
                        imageUrl = appendSourceWidth(imageUrl, imgixJsonImages.images.primary.sourceWidth);
                    } else {
                        const imageIndex = index - 1;
                        if (imageIndex < imgixJsonImages.images.alternatives.length) {
                            imageUrl = imgixJsonImages.images.alternatives[imageIndex].src;
                            imageUrl = appendSourceWidth(imageUrl, imgixJsonImages.images.alternatives[imageIndex].sourceWidth);
                        }
                    }
                }
                return {
                    alt: image.alt,
                    url: imageUrl,
                    index: index.toString(),
                    title: image.title,
                    absURL: image.absURL.toString()
                };
            });
        }
        this[type] = result;
    }, this);
}

/**
 * Append source width
 * @param {String} imageUrl - Image Url
 * @param {Number} sourceWidth - Source width
 * @returns {String} Image Url
 */
function appendSourceWidth(imageUrl, sourceWidth) {
    if (sourceWidth) {
        imageUrl += imageUrl.indexOf('?') !== -1 ? '&' : '?';
        imageUrl += 'sourceWidth=' + sourceWidth;
    }

    return imageUrl;
}

module.exports = Images;