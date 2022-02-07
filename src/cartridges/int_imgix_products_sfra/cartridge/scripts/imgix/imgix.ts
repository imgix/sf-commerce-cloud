/**
 * The purpose of this file is to be used by consumers of the imgix integration
 * to help rendering imgix images.
 * This file exports url helpers for this purpose.
 */

import type IImgixClient from "@imgix/js-core";
const ImgixClient =
  require("*/cartridge/scripts/jsCore/jsCore") as IImgixClient;

export const buildURL = (ImgixClient as any)
  ._buildURL as IImgixClient["buildURL"];

export const buildSrcSet = (ImgixClient as any)
  ._buildSrcSet as IImgixClient["buildSrcSet"];
