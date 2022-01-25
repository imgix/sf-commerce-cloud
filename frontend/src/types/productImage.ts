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

interface IViewType {
  small: boolean;
  medium: boolean;
  large: boolean;
}

export type ISwatchImages = {
  src: string;
  imgix_metadata: IImgixMetadata;
};

export type IProductImage = {
  src: string;
  imgix_metadata: IImgixMetadata;
  view_type: IViewType;
};

export type IProductImageData = {
  images: IProductImage[];
  swatchImages: ISwatchImages[];
};
