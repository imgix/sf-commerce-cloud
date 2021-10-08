export type ImgixGETSourcesData = {
  attributes: {
    name: string;
  };
  id: string;
  type: string;
}[];

export type ImgixGETAssetsData = {
  attributes: {
    analyzed_content_warnings: boolean;
    analyzed_faces: boolean;
    analyzed_tags: boolean;
    categories: null | [];
    color_model: string;
    color_profile: string;
    colors: {};
    content_type: string;
    custom_fields: null | string | string[];
    date_created: number;
    date_modified: number;
    description: null | string;
    dpi_height: number;
    dpi_width: number;
    face_count: null | string | number;
    file_size: number;
    has_frames: boolean;
    media_height: number;
    media_kind: null | string;
    media_width: number;
    name: null | string | string[];
    origin_path: string;
    source_id: string;
    tags: {};
    uploaded_by: null | string | string[];
    uploaded_by_api: boolean;
    warning_adult: number;
    warning_medical: number;
    warning_racy: number;
    warning_spoof: number;
    warning_violence: number;
  };
  id: string;
  type: "assets";
}[];
