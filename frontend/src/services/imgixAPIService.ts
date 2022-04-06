import ImgixManagementJS from "imgix-management-js";
import PACKAGE_VERSION from "../../package.json";
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
    pluginOrigin: `sfcc/v${PACKAGE_VERSION.version}`,
  });
  const response = await client.request(url, {
    method,
    ...(body && { body }),
  });
  return {
    ...response,
    cursor: response.meta.cursor as {
      current: string;
      next: string;
      hasMore: boolean;
      totalRecords: number;
    },
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
    async get(apiKey: string, index: string = "0", size: string = "20") {
      return await makeRequest<ImgixGETSourcesData>({
        url: `sources?sort=name&page[number]=${index}&page[size]=${size}&fields[sources]=name,deployment.custom_domains,deployment.type&filter[enabled]=true`,
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
      async get(
        apiKey: string,
        sourceId: string,
        index: string = "0",
        size: string = "20"
      ) {
        // ?page[number]=${n}&page[size]=18`
        return await makeRequest<ImgixGETAssetsData>({
          url: `assets/${sourceId}?page[cursor]=${index}&page[limit]=${size}&sort=-date_created&fields[assets]=name,description,origin_path,media_height,media_width`,
          apiKey,
        });
      },
    },
  },
  search: {
    /**
     * Search for images in the current imgix account
     * @param apiKey - The imgix API key to be used for the request
     * @param query - The query to search for
     * @returns An `data` array of asset objects and a `meta` object with
     * pagination information
     */
    async get(
      apiKey: string,
      sourceId: string,
      query: string,
      index: string = "0",
      size: string = "20"
    ) {
      // build the filter portion of the query
      const categories = `filter%5Bor:categories%5D=${query}`;
      const keywords = `&filter%5Bor:keywords%5D=${query}`;
      const origin_path = `&filter%5Bor:origin_path%5D=${query}`;
      const filter = categories + keywords + origin_path;
      // build the paging portion of the query
      const pageCursor = `page[cursor]=${index}`;
      const pageLimit = `&page[limit]=${size}`;
      // build the sorting portion of the query
      const sortBy = `sort=-date_created`;

      return await makeRequest<ImgixGETAssetsData>({
        url: `assets/${sourceId}?&${filter}&${pageCursor}&${pageLimit}&${sortBy}`,
        apiKey,
      });
    },
  },
};
