"use strict";
/**
 * The purpose of this file is to be used by consumers of the imgix integration
 * to help rendering imgix images.
 * This file exports url helpers for this purpose.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSrcSet = exports.buildURL = void 0;
var ImgixClient = require("*/cartridge/scripts/jsCore/jsCore");
exports.buildURL = ImgixClient._buildURL;
exports.buildSrcSet = ImgixClient._buildSrcSet;
