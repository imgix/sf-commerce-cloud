import { IImgixMetadata } from "../../../types";

export type IBreakoutAppData = {
  src: string;
  mediaWidth: number;
  mediaHeight: number;
  imgix_metadata: IImgixMetadata;
};
export type IBreakoutAppOnSubmit = (data: IBreakoutAppData) => void;
