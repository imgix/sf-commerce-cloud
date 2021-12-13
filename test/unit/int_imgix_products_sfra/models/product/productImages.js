"use strict";

var assert = require("chai").assert;
var proxyquire = require("proxyquire").noCallThru().noPreserveCache();
var ArrayList = require("../../../../mocks/dw.util.Collection");
var toProductMock = require("../../../../util");

var images = new ArrayList([
  {
    alt: "First Image",
    title: "First Image",
    index: "0",
    URL: {
      toString: function () {
        return "/first_image_url";
      },
    },
    absURL: {
      toString: function () {
        return "path/first_image_url";
      },
    },
  },
  {
    alt: "Second Image",
    title: "Second Image",
    index: "1",
    URL: {
      toString: function () {
        return "/second_image_url";
      },
    },
    absURL: {
      toString: function () {
        return "path/second_image_url";
      },
    },
  },
]);
var productMock = {
  getImages: {
    return: images,
    type: "function",
  },
};
var customData = {
  imgixData:
    '{"images": {"primary": {"src": "imgixBaseURL/first_image_url"},"alternatives": [{"src": "imgixBaseURL/second_image_url","sourceWidth": 3000}]}}',
};

function ProductVariationModel(isSelectedVariant, isMaster) {
  this.selectedVariant = isSelectedVariant ? { custom: customData } : null;
  this.master = isMaster ? { custom: customData } : null;
  this.getImages = function () {
    return images;
  };
}

function Product() {
  this.custom = customData;
  this.getImages = function () {
    return images;
  };
}

function Variant() {
  Product.call(this);
}
Variant.prototype = Object.create(Product.prototype);
Variant.prototype.constructor = Variant;

describe("productImages", function () {
  let imgixBaseURLPreferenceValue = "imgixBaseURL";
  let imgixProductDefaultParamsPreferenceValue = "";
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
    }
  );

  it("should get all small images with imgixBaseURL", function () {
    var images = new ProductImages(toProductMock(productMock), {
      types: ["small"],
      quantity: "*",
    });
    assert.equal(images.small.length, 2);
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].url, "imgixBaseURL/first_image_url");
    assert.equal(images.small[0].absURL, "path/first_image_url");
    assert.equal(images.small[1].url, "imgixBaseURL/second_image_url");
    assert.equal(images.small[1].absURL, "path/second_image_url");
    assert.equal(images.small[1].index, "1");
  });

  it("should get only first small image with imgixBaseURL", function () {
    var images = new ProductImages(toProductMock(productMock), {
      types: ["small"],
      quantity: "single",
    });
    assert.equal(images.small.length, 1);
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].url, "imgixBaseURL/first_image_url");
    assert.equal(images.small[0].absURL, "path/first_image_url");
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
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].url, "/first_image_url");

    // Restore old value
    imgixBaseURLPreferenceValue = oldImgixBaseURLPreferenceValue;
  });

  it("should set default params on product images", function () {
    // Setup test, keep old value to restore later
    const oldImgixProductDefaultParamsPreferenceValue =
      imgixProductDefaultParamsPreferenceValue;

    // Disable imgix base URL preference
    imgixProductDefaultParamsPreferenceValue = "auto=format&fit=crop";

    const containsDefaultParams = (url) =>
      url.includes("?auto=format&fit=crop");

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

  it("should get all small images with imgix data from selected variant product", function () {
    var productObj = new ProductVariationModel(true, true);
    var images = new ProductImages(productObj, {
      types: ["small"],
      quantity: "*",
    });
    assert.equal(images.small.length, 2);
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].url, "imgixBaseURL/first_image_url");
    assert.equal(images.small[0].absURL, "path/first_image_url");
    assert.equal(
      images.small[1].url,
      "imgixBaseURL/second_image_url?sourceWidth=3000"
    );

    assert.equal(images.small[1].absURL, "path/second_image_url");
    assert.equal(images.small[1].index, "1");
  });

  it("should get all small images with imgix data from master product", function () {
    var productObj = new ProductVariationModel(false, true);
    var images = new ProductImages(productObj, {
      types: ["small"],
      quantity: "*",
    });
    assert.equal(images.small.length, 2);
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].url, "imgixBaseURL/first_image_url");
    assert.equal(images.small[0].absURL, "path/first_image_url");
    assert.equal(
      images.small[1].url,
      "imgixBaseURL/second_image_url?sourceWidth=3000"
    );

    assert.equal(images.small[1].absURL, "path/second_image_url");
    assert.equal(images.small[1].index, "1");
  });

  it("should get only first small with imgix data from master product", function () {
    var productObj = new Product();
    var images = new ProductImages(productObj, {
      types: ["small"],
      quantity: "single",
    });
    assert.equal(images.small.length, 1);
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].url, "imgixBaseURL/first_image_url");
    assert.equal(images.small[0].absURL, "path/first_image_url");
  });

  it("should get only first small with imgix data from variant product", function () {
    var productObj = new Variant();
    var images = new ProductImages(productObj, {
      types: ["small"],
      quantity: "single",
    });
    assert.equal(images.small.length, 1);
    assert.equal(images.small[0].alt, "First Image");
    assert.equal(images.small[0].title, "First Image");
    assert.equal(images.small[0].index, "0");
    assert.equal(images.small[0].url, "imgixBaseURL/first_image_url");
    assert.equal(images.small[0].absURL, "path/first_image_url");
  });
});
