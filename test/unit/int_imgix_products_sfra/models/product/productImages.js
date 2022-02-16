"use strict";

var assert = require("chai").assert;
var proxyquire = require("proxyquire").noCallThru().noPreserveCache();
var ArrayList = require("../../../../mocks/dw.util.Collection");
var toProductMock = require("../../../../util");

/**
 * Test Information:
 * `images` variable helps ensure we're using the correct paths
 *   - in `images` data (which mocks SF data), path includes 'sf' to indicate that
 *     it came from SF data.
 *   - in `customData` (which mocks custom attribute data), path includes 'imgix'
 *     to show that data came from imgix.
 *
 */
var images = new ArrayList([
  {
    alt: "First Image alt",
    title: "First Image title",
    index: "0",
    URL: {
      toString: function () {
        return "/sf_first_image_url";
      },
    },
    absURL: {
      toString: function () {
        return "path/sf_first_image_url";
      },
    },
  },
  {
    alt: "Second Image alt",
    title: "Second Image title",
    index: "1",
    URL: {
      toString: function () {
        return "/sf_second_image_url";
      },
    },
    absURL: {
      toString: function () {
        return "path/sf_second_image_url";
      },
    },
  },
]);
var customData = {
  imgixData: JSON.stringify({
    images: [
      {
        src: "custom.imgix.net/imgix_first_image_url",
        title: "First Image title",
        alt: "First Image alt",
      },
      { src: "custom.imgix.net/imgix_second_image_url", sourceWidth: 3000 },
    ],
  }),
};

var productMock = {
  getImages: {
    return: images,
    type: "function",
  },
};

function ProductVariationModel(isSelectedVariant, isMaster) {
  this.selectedVariant = isSelectedVariant ? { custom: customData } : null;
  this.master = isMaster ? { custom: customData } : null;
  this.getImages = function () {
    return images;
  };
}

class Product {
  constructor({ customData, images } = {}) {
    if (customData) {
      this.custom = customData;
    }
    if (images) {
      this.images = images;
    }
  }
  getImages() {
    return this.images || images;
  }
}
class Variant extends Product {}

class Logger {
  static info(...args) {
    console.log(...args);
  }
}

describe("ProductImages model", function () {
  let imgixBaseURLPreferenceValue = "webfolder.imgix.net";
  let imgixProductDefaultParamsPreferenceValue = "";
  let imgixEnableProductImageProxyValue = true;
  var scriptImagesJS = proxyquire(
    process.cwd() +
      "/cartridges/int_imgix_products_sfra/cartridge/scripts/imgix/imgix",
    {
      "*/cartridge/scripts/jsCore/jsCore": require("../../../../../cartridges/int_imgix_products_sfra/cartridge/scripts/imgix/jsCore"),
    }
  );
  var ProductImages = proxyquire(
    process.cwd() +
      "/cartridges/int_imgix_products_sfra/cartridge/models/product/productImages",
    {
      "*/cartridge/scripts/util/collections": {
        first: function (collection) {
          var iterator = collection.iterator();
          return iterator.hasNext() ? iterator.next() : null;
        },
        map: function (collection, callback, scope) {
          var iterator = Object.hasOwnProperty.call(collection, "iterator")
            ? collection.iterator()
            : collection;
          var index = 0;
          var item = null;
          var result = [];
          while (iterator.hasNext()) {
            item = iterator.next();
            result.push(
              scope
                ? callback.call(scope, item, index, collection)
                : callback(item, index, collection)
            );
            index++;
          }
          return result;
        },
      },
      "dw/system/Site": {
        getCurrent: function () {
          return {
            getCustomPreferenceValue: function (preference) {
              switch (preference) {
                case "imgixProductDefaultParams":
                  return imgixProductDefaultParamsPreferenceValue;
                case "imgixBaseURL":
                  return imgixBaseURLPreferenceValue;
                case "imgixEnableProductImageProxy":
                  return imgixEnableProductImageProxyValue;
                default:
                  throw new Error("Preference value not set");
              }
            },
          };
        },
      },
      "dw/catalog/ProductVariationModel": ProductVariationModel,
      "dw/catalog/Product": Product,
      "dw/catalog/Variant": Variant,
      "dw/catalog/Logger": Logger,
      "../../scripts/imgix/imgix": scriptImagesJS,
    }
  );

  describe("with custom attribute", function () {
    it("should get all small images with imgixBaseURL", function () {
      var product = new Product({ customData });
      var images = new ProductImages(product, {
        types: ["small"],
        quantity: "*",
      });
      assert.equal(images.small.length, 2);
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].index, "0");
      assert.equal(images.small[0].title, "First Image title");
      assert.include(
        images.small[0].url,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[0].absURL,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[1].url,
        "custom.imgix.net/imgix_second_image_url"
      );
      // TODO: check if we should be modifying path
      assert.include(
        images.small[1].absURL,
        "custom.imgix.net/imgix_second_image_url"
      );
      assert.equal(images.small[1].index, "1");
    });

    it("should get only first small image with custom.imgix.net", function () {
      var product = new Product({ customData });
      var images = new ProductImages(product, {
        types: ["small"],
        quantity: "single",
      });
      assert.equal(images.small.length, 1);
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].title, "First Image title");
      assert.equal(images.small[0].index, "0");
      assert.include(
        images.small[0].url,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[0].absURL,
        "custom.imgix.net/imgix_first_image_url"
      );
    });
    it("should get all small images with imgix data from selected variant product", function () {
      var productObj = new ProductVariationModel(true, true);
      var images = new ProductImages(productObj, {
        types: ["small"],
        quantity: "*",
      });
      assert.equal(images.small.length, 2);
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].index, "0");
      assert.equal(images.small[0].title, "First Image title");
      assert.include(
        images.small[0].url,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[0].absURL,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[1].url,
        "custom.imgix.net/imgix_second_image_url"
      );

      assert.include(
        images.small[1].absURL,
        "custom.imgix.net/imgix_second_image_url"
      );
      assert.equal(images.small[1].index, "1");
    });
    it("should get all small images with imgix data from master product", function () {
      var productObj = new ProductVariationModel(false, true);
      var images = new ProductImages(productObj, {
        types: ["small"],
        quantity: "*",
      });
      assert.equal(images.small.length, 2);
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].index, "0");
      assert.equal(images.small[0].title, "First Image title");
      assert.include(
        images.small[0].url,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[0].absURL,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[1].url,
        "custom.imgix.net/imgix_second_image_url"
      );

      assert.include(
        images.small[1].absURL,
        "custom.imgix.net/imgix_second_image_url"
      );
      assert.equal(images.small[1].index, "1");
    });
    it("should get only first small with imgix data from master product", function () {
      var productObj = new Product({ customData });
      var images = new ProductImages(productObj, {
        types: ["small"],
        quantity: "single",
      });
      assert.equal(images.small.length, 1);
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].title, "First Image title");
      assert.equal(images.small[0].index, "0");
      assert.include(
        images.small[0].url,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[0].absURL,
        "custom.imgix.net/imgix_first_image_url"
      );
    });
    it("should get only first small with imgix data from variant product", function () {
      var productObj = new Product({ customData });
      var images = new ProductImages(productObj, {
        types: ["small"],
        quantity: "single",
      });
      assert.equal(images.small.length, 1);
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].title, "First Image title");
      assert.equal(images.small[0].index, "0");
      assert.include(
        images.small[0].url,
        "custom.imgix.net/imgix_first_image_url"
      );
      assert.include(
        images.small[0].absURL,
        "custom.imgix.net/imgix_first_image_url"
      );
    });

    it("should still work when imgixBaseURL preference is not set");
    it("should set default params on images");

    it("should fallback to SF images with empty custom images array", function () {
      var product = new Product({
        customData: JSON.stringify({
          imgixData: {
            images: [],
          },
        }),
      });
      var images = new ProductImages(product, {
        types: ["small"],
        quantity: "single",
      });
      assert.equal(images.small[0].alt, "First Image alt");
      assert.equal(images.small[0].title, "First Image title");
      assert.equal(images.small[0].index, "0");
      assert.include(
        images.small[0].url,
        "webfolder.imgix.net/sf_first_image_url"
      );
    });

    describe("should pass through raw imgix url", () => {
      ["small", "medium", "large"].map((viewType) => {
        ["single", "*"].map((quantity) => {
          it(`when view type is ${viewType} and quantity is ${quantity}`, () => {
            var productObj = new Product({ customData });
            var images = new ProductImages(productObj, {
              types: [viewType],
              quantity: quantity,
            });
            assert.equal(
              images[viewType][0].rawURL,
              "custom.imgix.net/imgix_first_image_url"
            );
            if (quantity === "*") {
              assert.equal(
                images[viewType][1].rawURL,
                "custom.imgix.net/imgix_second_image_url"
              );
            }
          });
        });
      });
    });
    const PACKAGE_VERSION = require("../../../../../package").version;
    it(`should set ixlib to sf-${PACKAGE_VERSION}`, () => {
      var productObj = new Product({ customData });
      var images = new ProductImages(productObj, {
        types: ["small"],
        quantity: "single",
      });
      assert.include(images["small"][0].url, `ixlib=sf-${PACKAGE_VERSION}`);
      assert.include(images["small"][0].absURL, `ixlib=sf-${PACKAGE_VERSION}`);
    });
  });

  describe("without custom attribute", () => {
    describe("when imgixBaseURL preference set", () => {
      it("should get all small images with imgixBaseURL", function () {
        var images = new ProductImages(toProductMock(productMock), {
          types: ["small"],
          quantity: "*",
        });
        assert.equal(images.small.length, 2);
        assert.equal(images.small[0].alt, "First Image alt");
        assert.equal(images.small[0].index, "0");
        assert.equal(images.small[0].title, "First Image title");
        assert.include(
          images.small[0].url,
          "webfolder.imgix.net/sf_first_image_url"
        );
        assert.include(
          images.small[0].absURL,
          "webfolder.imgix.net/sf_first_image_url"
        );
        assert.include(
          images.small[1].url,
          "webfolder.imgix.net/sf_second_image_url"
        );
        assert.include(
          images.small[1].absURL,
          "webfolder.imgix.net/sf_second_image_url"
        );
        assert.equal(images.small[1].index, "1");
      });

      it("should get only first small image with imgixBaseURL", function () {
        var images = new ProductImages(toProductMock(productMock), {
          types: ["small"],
          quantity: "single",
        });
        assert.equal(images.small.length, 1);
        assert.equal(images.small[0].alt, "First Image alt");
        assert.equal(images.small[0].title, "First Image title");
        assert.equal(images.small[0].index, "0");
        assert.include(
          images.small[0].url,
          "webfolder.imgix.net/sf_first_image_url"
        );
        assert.include(
          images.small[0].absURL,
          "webfolder.imgix.net/sf_first_image_url"
        );
      });
    });
    describe("when imgixBaseURL preference is not set", () => {
      it("should pass through small images when imgixBaseURL preference is not set", function () {
        // Setup test, keep old value to restore later
        const oldImgixBaseURLPreferenceValue = imgixBaseURLPreferenceValue;

        // Disable imgix base URL preference
        imgixBaseURLPreferenceValue = "";

        var images = new ProductImages(toProductMock(productMock), {
          types: ["small"],
          quantity: "*",
        });
        assert.equal(images.small.length, 2);
        assert.equal(images.small[0].alt, "First Image alt");
        assert.equal(images.small[0].title, "First Image title");
        assert.equal(images.small[0].index, "0");
        assert.equal(images.small[0].url, "/sf_first_image_url");
        assert.equal(images.small[0].absURL, "path/sf_first_image_url");
        assert.equal(images.small[1].url, "/sf_second_image_url");
        assert.equal(images.small[1].absURL, "path/sf_second_image_url");
        assert.equal(images.small[1].index, "1");

        // Restore old value
        imgixBaseURLPreferenceValue = oldImgixBaseURLPreferenceValue;
      });
      it("should pass through small image when imgixBaseURL preference is not set", function () {
        // Setup test, keep old value to restore later
        const oldImgixBaseURLPreferenceValue = imgixBaseURLPreferenceValue;

        // Disable imgix base URL preference
        imgixBaseURLPreferenceValue = "";

        var images = new ProductImages(toProductMock(productMock), {
          types: ["small"],
          quantity: "single",
        });
        assert.equal(images.small.length, 1);
        assert.equal(images.small[0].alt, "First Image alt");
        assert.equal(images.small[0].title, "First Image title");
        assert.equal(images.small[0].index, "0");
        assert.equal(images.small[0].url, "/sf_first_image_url");

        // Restore old value
        imgixBaseURLPreferenceValue = oldImgixBaseURLPreferenceValue;
      });
    });

    it("should set default params on product images", function () {
      const oldImgixProductDefaultParamsPreferenceValue =
        imgixProductDefaultParamsPreferenceValue;

      imgixProductDefaultParamsPreferenceValue = "auto=format&fit=crop";

      const containsDefaultParams = (url) =>
        url.includes("auto=format") && url.includes("fit=crop");

      const singleSmallImage = new ProductImages(toProductMock(productMock), {
        types: ["small"],
        quantity: "single",
      });
      assert(
        containsDefaultParams(singleSmallImage.small[0].url),
        "url should include default params"
      );

      const smallImages = new ProductImages(toProductMock(productMock), {
        types: ["small"],
        quantity: "*",
      });
      assert(
        containsDefaultParams(smallImages.small[0].url),
        "url should include default params"
      );
      assert(
        containsDefaultParams(smallImages.small[1].url),
        "url should include default params"
      );

      // Restore old value
      imgixProductDefaultParamsPreferenceValue =
        oldImgixProductDefaultParamsPreferenceValue;
    });

    describe("should pass through raw imgix url", () => {
      ["small", "medium", "large"].map((viewType) => {
        ["single", "*"].map((quantity) => {
          it(`when view type is ${viewType} and quantity is ${quantity}`, () => {
            var productObj = new Product();
            var images = new ProductImages(productObj, {
              types: [viewType],
              quantity: quantity,
            });
            assert.equal(
              images[viewType][0].rawURL,
              "webfolder.imgix.net/sf_first_image_url"
            );
            if (quantity === "*") {
              assert.equal(
                images[viewType][1].rawURL,
                "webfolder.imgix.net/sf_second_image_url"
              );
            }
          });
        });
      });
    });
    const PACKAGE_VERSION = require("../../../../../package").version;
    it(`should set ixlib to sf-${PACKAGE_VERSION}`, () => {
      var productObj = new Product();
      var images = new ProductImages(productObj, {
        types: ["small"],
        quantity: "single",
      });
      assert.include(images["small"][0].url, `ixlib=sf-${PACKAGE_VERSION}`);
      assert.include(images["small"][0].absURL, `ixlib=sf-${PACKAGE_VERSION}`);
    });
  });

  describe("auto-resizing images", () => {
    describe("should not resize passed-through images", () => {
      it("small image", () => {
        const singleSmallImage = new ProductImages(new Product(), {
          types: ["small"],
          quantity: "single",
        });

        assert.notInclude(singleSmallImage.small[0].url, "w=");
        assert.notInclude(singleSmallImage.small[0].url, "h=");
      });
      it("small images", () => {
        const singleSmallImage = new ProductImages(new Product(), {
          types: ["small"],
          quantity: "*",
        });

        assert.notInclude(singleSmallImage.small[0].url, "w=");
        assert.notInclude(singleSmallImage.small[0].url, "h=");
        assert.notInclude(singleSmallImage.small[1].url, "w=");
        assert.notInclude(singleSmallImage.small[1].url, "h=");
      });
      it("medium image", () => {
        const singleSmallImage = new ProductImages(new Product(), {
          types: ["medium"],
          quantity: "single",
        });

        assert.notInclude(singleSmallImage.medium[0].url, "w=");
        assert.notInclude(singleSmallImage.medium[0].url, "h=");
      });
      it("medium images", () => {
        const singleSmallImage = new ProductImages(new Product(), {
          types: ["medium"],
          quantity: "*",
        });

        assert.notInclude(singleSmallImage.medium[0].url, "w=");
        assert.notInclude(singleSmallImage.medium[0].url, "h=");
        assert.notInclude(singleSmallImage.medium[1].url, "w=");
        assert.notInclude(singleSmallImage.medium[1].url, "h=");
      });
      it("large image", () => {
        const singleSmallImage = new ProductImages(new Product(), {
          types: ["large"],
          quantity: "single",
        });

        assert.notInclude(singleSmallImage.large[0].url, "w=");
        assert.notInclude(singleSmallImage.large[0].url, "h=");
      });
      it("large images", () => {
        const singleSmallImage = new ProductImages(new Product(), {
          types: ["large"],
          quantity: "*",
        });

        assert.notInclude(singleSmallImage.large[0].url, "w=");
        assert.notInclude(singleSmallImage.large[0].url, "h=");
        assert.notInclude(singleSmallImage.large[1].url, "w=");
        assert.notInclude(singleSmallImage.large[1].url, "h=");
      });
    });

    describe("when resizing image(s) from custom attribute", () => {
      const CONFIG = {
        small: { w: 140, h: 140 },
        medium: { w: 400, h: 400 },
        large: { w: 800, h: 800 },
      };

      Object.entries(CONFIG).map(([viewType, { w, h }]) => {
        ["single", "*"].map((quantity) => {
          it(`should resize image to ${w}x${h} when view type is ${viewType} and quantity is ${quantity}`, () => {
            var productObj = new Product({ customData });
            var images = new ProductImages(productObj, {
              types: [viewType],
              quantity: quantity,
            });
            assert(images[viewType].length > 0);
            images[viewType].map(({ url, absURL }) => {
              assert.include(url, `w=${w}`);
              assert.include(url, `h=${h}`);
              assert.include(absURL, `w=${w}`);
              assert.include(absURL, `h=${h}`);
            });
          });
        });
      });
    });

    describe("should not proxy url or absURL when feature is disabled", () => {
      it("when querying single image from a product with a custom attribute", () => {
        imgixEnableProductImageProxyValue = false;

        const singleImage = new ProductImages(new Product({ customData }), {
          types: ["large"],
          quantity: "single",
        });

        assert.equal(singleImage.large[0].url, "/sf_first_image_url");
        assert.equal(singleImage.large[0].absURL, "path/sf_first_image_url");

        imgixEnableProductImageProxyValue = true;
      });

      it("when querying multiple images from a product with a custom attribute", () => {
        imgixEnableProductImageProxyValue = false;

        const multipleImages = new ProductImages(new Product({ customData }), {
          types: ["large"],
          quantity: "*",
        });

        assert.equal(multipleImages.large[0].url, "/sf_first_image_url");
        assert.equal(multipleImages.large[0].absURL, "path/sf_first_image_url");
        assert.equal(multipleImages.large[1].url, "/sf_second_image_url");
        assert.equal(
          multipleImages.large[1].absURL,
          "path/sf_second_image_url"
        );

        imgixEnableProductImageProxyValue = true;
      });

      it("when querying single pass-through image", () => {
        imgixEnableProductImageProxyValue = false;

        const singleImage = new ProductImages(new Product(), {
          types: ["large"],
          quantity: "single",
        });

        assert.equal(singleImage.large[0].url, "/sf_first_image_url");
        assert.equal(singleImage.large[0].absURL, "path/sf_first_image_url");

        imgixEnableProductImageProxyValue = true;
      });
      it("when querying multiple pass-through images", () => {
        imgixEnableProductImageProxyValue = false;

        const multipleImages = new ProductImages(new Product(), {
          types: ["large"],
          quantity: "*",
        });

        assert.equal(multipleImages.large[0].url, "/sf_first_image_url");
        assert.equal(multipleImages.large[0].absURL, "path/sf_first_image_url");
        assert.equal(multipleImages.large[1].url, "/sf_second_image_url");
        assert.equal(
          multipleImages.large[1].absURL,
          "path/sf_second_image_url"
        );

        imgixEnableProductImageProxyValue = true;
      });
      it(`should not set ixlib for custom attribute images`, () => {
        imgixEnableProductImageProxyValue = false;

        var productObj = new Product({ customData });
        var images = new ProductImages(productObj, {
          types: ["small"],
          quantity: "single",
        });
        assert.notInclude(images["small"][0].url, `ixlib=`);
        assert.notInclude(images["small"][0].absURL, `ixlib=`);

        imgixEnableProductImageProxyValue = true;
      });
      it(`should not set ixlib for SF product images`, () => {
        imgixEnableProductImageProxyValue = false;

        var productObj = new Product();
        var images = new ProductImages(productObj, {
          types: ["small"],
          quantity: "single",
        });
        assert.notInclude(images["small"][0].url, `ixlib=`);
        assert.notInclude(images["small"][0].absURL, `ixlib=`);

        imgixEnableProductImageProxyValue = true;
      });
    });
  });
});
