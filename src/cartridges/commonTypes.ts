export type IImgixCustomAttributeImage = {
  src: string;
  title?: string;
  alt?: string;
  imgix_metadata?: Record<string, any>;
  view_type?: {
    small: boolean;
    medium: boolean;
    large: boolean;
  };
};
export type IImgixCustomAttributeSwatch = {
  src: string;
  imgix_metadata?: Record<string, any>;
};

export type IImgixCustomAttribute = {
  images: IImgixCustomAttributeImage[];
  swatches: IImgixCustomAttributeSwatch[];
};
