export type ImgixGETSourcesData = {
  attributes: {
    name: string;
    custom_domains?: string[];
  };
  id: string;
  type: "sources";
}[];

export type ImgixGETAssetsData = {
  attributes: {
    description: null | string;
    name: null | string;
    origin_path: string;
    media_height: number;
    media_width: number;
  };
  id: string;
  type: "assets";
}[];
