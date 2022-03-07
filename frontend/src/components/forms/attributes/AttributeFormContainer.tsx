import React from "react";
import { IImgixCustomAttributeImage } from "../../../../../types";
import { AttributeForm } from "./AttributeForm";

type Props = {
  asset: IImgixCustomAttributeImage | undefined;
  onSubmit: (attributes: { alt: string; title: string }) => void;
  onCancel: () => void;
};

export function AttributeFormContainer({ asset, onSubmit, onCancel }: Props) {
  if (!asset) {
    return null;
  }
  return (
    <AttributeForm asset={asset} onSubmit={onSubmit} onCancel={onCancel} />
  );
}
