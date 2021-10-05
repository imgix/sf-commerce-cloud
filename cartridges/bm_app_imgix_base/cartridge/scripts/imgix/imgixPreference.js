'use strict';
//This file will help to get the all Imgix configuration,  Add all site prefrence value related to imgix in here.
var currentSite = require('dw/system/Site').getCurrent();

var preference = {
    getImgixBody: function () {
        return currentSite.getCustomPreferenceValue('ImgixBody');
    },

    getImgixversion: function () {
        return currentSite.getCustomPreferenceValue('Imgixversion');
    },

    getImgixOptions: function () {
        return currentSite.getCustomPreferenceValue('ImgixOptions');
    },

    getImgixAPI: function () {
        return currentSite.getCustomPreferenceValue('ImgixAPI');
    },

    getImgixMethod: function () {
        return currentSite.getCustomPreferenceValue('ImgixMethod');
    },

    getImgixHeaders: function () {
        return currentSite.getCustomPreferenceValue('ImgixHeaders');
    },

    getImgixSourceId: function () {
        return currentSite.getCustomPreferenceValue('ImgixSourceId');
    },

    getImgixPath: function () {
        return currentSite.getCustomPreferenceValue('ImgixPath');
    },
    
    getImgixapiKey: function () {
        return currentSite.getCustomPreferenceValue('ImgixapiKey');
    }
};

module.exports.preference = preference;