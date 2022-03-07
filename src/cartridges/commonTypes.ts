export type IImgixMetadata = {
  attributes: {
    description: null | string;
    name: null | string;
    origin_path: string;
    media_height: number;
    media_width: number;
  };
  base_url: string;
  id: string;
  type: "assets";
};

export type IImgixCustomAttributeImage = {
  src: string;
  title?: string;
  alt?: string;
  imgix_metadata?: IImgixMetadata;
};
export type IImgixCustomAttributeSwatch = {
  src: string;
  imgix_metadata?: IImgixMetadata;
};

export type IImgixCustomAttribute = {
  images: IImgixCustomAttributeImage[];
};
