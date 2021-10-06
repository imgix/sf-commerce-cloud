'use strict';
//This file will help to get the all Imgix configuration,  Add all site prefrence value related to imgix in here.
var currentSite = require('dw/system/Site').getCurrent();

var preference = {
    getImgixApiKey: function () {
        return currentSite.getCustomPreferenceValue('ImgixapiKey');
    }
};

module.exports.preference = preference;