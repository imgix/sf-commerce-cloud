import React from "react";
import Imgix from "react-imgix";
import { IImgixMetadata, ImgixGETAssetsData } from "../../../../types";

type Props = {
  asset: ImgixGETAssetsData[0] | IImgixMetadata | undefined;
  domain: string;
};

export function AssetCardImage({ asset, domain }: Props) {
  return (
    <Imgix
      src={"https://" + domain + asset?.attributes.origin_path}
      imgixParams={{
        auto: "format",
        fit: "crop",
        crop: "entropy",
      }}
      htmlAttributes={{
        title: asset?.attributes.name || asset?.attributes.origin_path || "",
        alt: asset?.attributes.name || asset?.attributes.origin_path || "",
      }}
      /* This sizes attribute is a monster and sets the size of the image
       * correctly, handling both the SF breakpoints and the design
       * breakpoints
       * The SF modal has a breakpoint at 768px (48rem), below which the
       * modal has a margin around it of 32px, and above which it has a
       * margin of 5% each side.
       * In these calculates, the format is:
       * calc((100vw - SFmargin - modalMargin - betweenColumnMarginSum)/numColumns)
       * */
      sizes="(max-width: 500px) calc((100vw - 64px - 32px - 16px)/2),
            (max-width: 700px) calc((100vw - 64px - 32px - 32px)/3),
            (max-width: 768px) calc((100vw - 64px - 32px - 48px)/4),
            (max-width: 820px) calc((100vw - 10vw - 32px - 48px)/4),
            (max-width: 960px) calc((100vw - 10vw - 32px - 80px)/6),
            calc((100vw - 10vw - 32px - 96px)/7)"
    />
  );
}
