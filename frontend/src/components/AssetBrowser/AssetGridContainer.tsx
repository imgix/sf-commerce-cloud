import React, { ReactElement } from "react";
import { ImgixProvider } from "react-imgix";
import { ImgixGETAssetsData } from "../../types";
import { AssetGrid } from "../grids/AssetGrid";

interface Props {
  assets: ImgixGETAssetsData;
  domain: string;
}

export function AssetGridContainer({ assets, domain }: Props): ReactElement {
  // If there is no domain or no assets, return placeholder
  if (!domain || !assets.length) {
    return (
      <div className="ix-grid ix-grid-item-placeholder ">
        <div className="ix-grid-item ix-asset-grid-loading">
          <div className="">
            <p>
              {!assets.length && domain
                ? "Selected source has no assets"
                : "Select a source"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ix-asset-grid-container">
      <ImgixProvider
        domain={domain}
        width={342}
        height={342}
        imgixParams={{
          auto: "format",
          fit: "crop",
          crop: "entropy",
        }}
        sizes="(min-width: 480px) 342px, 100vw"
      >
        <AssetGrid assets={assets} />
      </ImgixProvider>
    </div>
  );
}
