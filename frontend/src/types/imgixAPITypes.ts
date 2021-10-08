export type ImgixGETSourcesData = {
  attributes: {
    name: string;
  };
  id: string;
  type: string;
}[];

export type ImgixGETAssetsData = {
  attributes: {
    description: null | string;
    name: null | string;
    origin_path: string;
    source_id: string;
  };
  id: string;
  type: "assets";
}[];
