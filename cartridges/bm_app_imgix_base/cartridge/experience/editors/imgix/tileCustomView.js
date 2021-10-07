'use strict';

/**
 * Init for the displayFormat radio button custom editor
 *
 * Initialises the custom attribute editor with server side information. This editor does not need any.
 */

// Ww can include the SFCC script to the component js
var ImgixPreference = require('*/imgix/imgixPreference');

module.exports.init = function (editor) {
    var Logger = require('dw/system/Logger');
    Logger.info("ImgixPreference API infromation "+ ImgixPreference.getImgixApiKey);
};

module.exports.init = function () {};