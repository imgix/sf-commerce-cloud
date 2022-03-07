/**
 * The purpose of this file is to be used by consumers of the imgix integration
 * to help rendering imgix images.
 * This file exports url helpers for this purpose.
 */

import type IImgixClient from "@imgix/js-core";
import type { SrcSetOptions } from "@imgix/js-core";
const ImgixClient =
  require("*/cartridge/scripts/jsCore/jsCore") as IImgixClient;

export type IBuildURL = (
  url: string,
  params?: Record<string, any>,
  options?: Partial<ConstructorParameters<typeof IImgixClient>[0]>
) => string;
export const buildURL = (ImgixClient as any)._buildURL as IBuildURL;

export type IBuildSrcset = (
  url: string,
  params?: Record<string, any>,
  srcsetParams?: SrcSetOptions,
  options?: Partial<ConstructorParameters<typeof IImgixClient>[0]>
) => string;
export const buildSrcSet = (ImgixClient as any)._buildSrcSet as IBuildSrcset;
