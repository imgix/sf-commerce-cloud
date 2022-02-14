import React from "react";
import { IImgixCustomAttributeImage } from "../../../../../types";
import { FrameButton } from "../../buttons/FrameButton/FrameButton";
import { ArrowRight, DisabledSvg } from "../../icons";
import { ButtonListSvg } from "../../icons/ButtonListSvg";
import { MetaSvg } from "../../icons/MetaSvg";
import styles from "./AttributeForm.module.scss";

type AttributeFormProps = {
  asset: IImgixCustomAttributeImage | undefined;
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
    // set the alt and title on first render
    if (asset) {
      setAlt(asset.alt || "");
      setTitle(asset.title || "");
    }
  }, [asset]);

  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <label className={styles.formLabel}>
          <MetaSvg />
          <p>Alt text</p>
        </label>
        <input
          type="text"
          // Extension will default to this if not provided.
          // Important to surface this here to the user to make it
          // clear what the default is.
          // placeholder={placeholder}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
        <label className={styles.formLabel}>
          <ButtonListSvg />
          <p>Title</p>
        </label>
        <input
          type="text"
          // placeholder={placeholder}
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
