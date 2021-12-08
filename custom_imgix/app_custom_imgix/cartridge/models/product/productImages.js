'use strict';

var collections = require('*/cartridge/scripts/util/collections');
const currentSite = require('dw/system/Site').getCurrent();

/**
 * @constructor
 * @classdesc Returns images for a given product
 * @param {dw.catalog.Product} product - product to return images for
 * @param {Object} imageConfig - configuration object with image types
 */
function Images(product, imageConfig) {
    const imgixBaseURL = currentSite.getCustomPreferenceValue('imgixBaseURL');
    let imgixJsonImages = null;

    if (product instanceof require('dw/catalog/ProductVariationModel')) {
        const productVariant = product.selectedVariant;
        imgixJsonImages = productVariant && productVariant.custom && productVariant.custom.imgixData && JSON.parse(product.selectedVariant.custom.imgixData);
    } else if (product instanceof require('dw/catalog/Variant') || product instanceof require('dw/catalog/Product')) {
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
                    imageUrl = imgixJsonImages.images[0].image_url;
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
                        imageUrl = imgixJsonImages.images[0].image_url;
                    } else {
                        imageUrl = imgixJsonImages.images[1].image_url;
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

module.exports = Images;
