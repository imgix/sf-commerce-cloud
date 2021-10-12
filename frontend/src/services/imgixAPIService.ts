import ImgixManagementJS from "imgix-management-js";
import {
  ImgixGETAssetsData,
  ImgixGETSourcesData,
} from "../types/imgixAPITypes";

/**
 * Make a request to the imgix API.
 * The internals could be changed as needed to use a SFCC service object, for example.
 * @param param0.url - The url to be requested, should not have a domain or http://
 * @param param0.apiKey - The imgix API key to be used for the request
 */
const makeRequest = async <TData = {}>({
  url,
  apiKey,
  method = "GET",
  body,
}: {
  url: string;
  apiKey: string;
  method?: "GET" | "POST" | "PATCH";
  body?: Record<any, any>;
}) => {
  const client = new ImgixManagementJS({
    apiKey: apiKey,
  });
  const response = await client.request(url, {
    method,
    ...(body && { body }),
  });
  return {
    ...response,
    data: (response.data as any) as TData,
  };
};

/**
 * A collection of functions to make requests to the imgix API.
 */
export const imgixAPI = {
  sources: {
    /**
     * Get a list of sources for the current imgix account
     * @param apiKey - The imgix API key to be used for the request
     * @returns A list of sources
     */
    async get(apiKey: string) {
      return await makeRequest<ImgixGETSourcesData>({
        url: `sources?sort=name&fields[sources]=name&filter[enabled]=true`,
        apiKey,
      });
    },
    assets: {
      /**
       * Get a list of images for a given source
       * @param apiKey - The imgix API key to be used for the request
       * @param sourceId - The source ID to find images for
       * @returns A list of images
       */
      async get(apiKey: string, sourceId: string) {
        return await makeRequest<ImgixGETAssetsData>({
          url: `assets/${sourceId}?sort=-date_modified&fields[assets]=name,description,origin_path`,
          apiKey,
        });
      },
    },
  },
};
