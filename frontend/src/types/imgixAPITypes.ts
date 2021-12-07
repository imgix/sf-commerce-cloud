export type IDeploymentType = "azure" | "gcs" | "s3" | "webfolder" | "webproxy";

export type ImgixGETSourcesData = {
  attributes: {
    name: string;
    deployment: {
      custom_domains?: string[];
      type: IDeploymentType;
    };
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
