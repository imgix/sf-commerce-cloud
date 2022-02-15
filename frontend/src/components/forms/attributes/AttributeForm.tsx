import React from "react";
import { IImgixCustomAttributeImage } from "../../../../../types";
import { FrameButton } from "../../buttons/FrameButton/FrameButton";
import { ArrowRight, DisabledSvg } from "../../icons";
import { ButtonListSvg } from "../../icons/ButtonListSvg";
import { MetaSvg } from "../../icons/MetaSvg";
import styles from "./AttributeForm.module.scss";

type AttributeFormProps = {
  asset: IImgixCustomAttributeImage;
  onSubmit: (attributes: { alt: string; title: string }) => void;
  onCancel: () => void;
};

export function AttributeForm({
  asset,
  onSubmit,
  onCancel,
}: AttributeFormProps) {
  const [alt, setAlt] = React.useState("");
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    /**
     * Sets the alt and title on first render to the values of the asset
     *
     * By default the asset's alt and default to imgix_metadata.attributes.name
     * or imgix_metadata.attributes.origin_path. This is because the SFCC
     * requires that all images have alt/title attributes defined.
     *
     * In the unlikely event that the asset does not have an alt/title attribute
     * defined, the alt/title values in the form will be set to an empty string.
     *  */
    setAlt(asset.alt || "");
    setTitle(asset.title || "");
  }, [asset]);

  const submitFormOnEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      onSubmit({ alt, title });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onKeyPress={submitFormOnEnter}>
        <label className={styles.formLabel}>
          <MetaSvg />
          <p>Alt text</p>
        </label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
        <label className={styles.formLabel}>
          <ButtonListSvg />
          <p>Title</p>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <div className={styles.formButtons}>
        <FrameButton
          icon={<DisabledSvg />}
          color="primary"
          label={"Cancel"}
          onClick={() => onCancel()}
        />
        <FrameButton
          icon={<ArrowRight />}
          color="secondary"
          label={"Accept"}
          onClick={() => onSubmit({ alt, title })}
        />
      </div>
    </div>
  );
}
