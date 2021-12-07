import ImgixManagementJS, { APIError } from "imgix-management-js";
import URI from "jsuri";
import { mocked } from "ts-jest/utils";
import { imgixAPI } from "../../services/imgixAPIService";
import {
  ImgixGETAssetsData,
  ImgixGETSourcesData,
} from "../../types/imgixAPITypes";

jest.mock("imgix-management-js");

const ImgixManagementJSMock = mocked(ImgixManagementJS, true);

const testSource: ImgixGETSourcesData[0] = {
  attributes: {
    name: "Test Source",
  },
  id: "1234",
  type: "sources",
};

const testAsset: ImgixGETAssetsData[0] = {
  attributes: {
    description: "Test Asset Description",
    name: "Test Asset",
    origin_path: "path/to/image.jpg",
  },
  id: "2345",
  type: "assets",
};

let mockRequest: jest.Mock;
beforeEach(() => {
  ImgixManagementJSMock.mockClear();
  mockRequest = jest.fn().mockImplementation(async (url) => {
    return {
      // Hacky way to mock the response from the API, change url matching in future
      data: url.startsWith("sources?") ? [testSource] : [testAsset],
      included: [],
      jsonapi: {},
      meta: {},
    };
  });
  ImgixManagementJSMock.mockImplementation(({ apiKey, version }) => {
    return {
      request: mockRequest,
      apiKey,
      version: version ?? 1,
      APIError: APIError,
    };
  });
});

test("should return sources correctly", async () => {
  const data = await imgixAPI.sources.get("test-api-key");
  expect(data.data[0]).toMatchObject(testSource);
});

test("should return assets correctly", async () => {
  const data = await imgixAPI.sources.assets.get(
    "test-api-key",
    "test1234abcd"
  );
  expect(data.data[0]).toMatchObject(testAsset);
});

test("should return assets in date modified descending order", async () => {
  await imgixAPI.sources.assets.get("test-api-key", "test1234abcd");

  const requestedUrl = mockRequest.mock.calls[0][0];
  const requestedURI = new URI(requestedUrl);
  expect(requestedURI.getQueryParamValue("sort")).toBe("date_created");
});

test("should return name, description, and origin_path information", async () => {
  await imgixAPI.sources.assets.get("test-api-key", "test1234abcd");

  const requestedUrl = mockRequest.mock.calls[0][0];
  const requestedURI = new URI(requestedUrl);
  const fieldAssetsQueryParamArray = requestedURI
    .getQueryParamValue("fields[assets]")
    .split(",");

  expect(fieldAssetsQueryParamArray).toContain("name");
  expect(fieldAssetsQueryParamArray).toContain("description");
  expect(fieldAssetsQueryParamArray).toContain("origin_path");
});
