import { ImgixGETAssetsData } from "../../types";
import { FrameButton } from "../buttons/FrameButton/FrameButton";
import { AssetCard } from "../card/AssetCard";
import { Divider } from "../dividers/Divider";
import { DeleteIcon, ImageSingle, SourceMenuSvg } from "../icons";
import styles from "./InfoPanel.module.scss";

export type InfoPanelProps = {
  assets: ImgixGETAssetsData;
  domain: string;
  selectedAssets: string[];
  onSubmit: (assets: ImgixGETAssetsData) => void;
};

export function InfoPanel({
  assets,
  selectedAssets,
  domain,
  onSubmit,
}: InfoPanelProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SourceMenuSvg />
        <p>{`${selectedAssets.length} Image${
          selectedAssets.length > 1 ? "s" : ""
        } Selected`}</p>
      </div>
      <Divider />
      <ul>
        {assets.map((asset, idx) => {
          if (selectedAssets.includes(asset.id)) {
            const assetTitle = asset.attributes.origin_path.split("/").pop();
            return (
              <li className={styles.productContainer} key={asset.id}>
                <div className={styles.assetTitleBar}>
                  <ImageSingle />
                  <p className={styles.assetTitle}>{assetTitle}</p>
                  <div className={styles.deleteIcon}>
                    <FrameButton
                      color="tertiary"
                      frameless
                      icon={<DeleteIcon />}
                    />
                  </div>
                </div>
                <div className={styles.assetContainer}>
                  <div className={styles.assetCardContainer}>
                    <AssetCard
                      layout="list"
                      height="150px"
                      domain={domain}
                      asset={asset}
                      noFilepath
                    />
                  </div>
                  <div className={styles.assetButtonsContainer}>
                    <div className={styles.assetButtons}>
                      <FrameButton size="small" color="primary" />
                      <p>Large</p>
                    </div>
                    <div className={styles.assetButtons}>
                      <FrameButton size="small" color="primary" />
                      <p>Medium</p>
                    </div>
                    <div className={styles.assetButtons}>
                      <FrameButton size="small" color="primary" />
                      <p>Small</p>
                    </div>
                  </div>
                </div>
                {idx !== selectedAssets.length - 1 && <Divider />}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
