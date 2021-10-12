import ImgixManagementJS, { APIError } from "imgix-management-js";
import { mocked } from "ts-jest/utils";
import { imgixAPI } from "../../services/imgixAPIService";
import { ImgixGETSourcesData } from "../../types/imgixAPITypes";

jest.mock("imgix-management-js");

const ImgixManagementJSMock = mocked(ImgixManagementJS, true);

const testSource: ImgixGETSourcesData[0] = {
  attributes: {
    name: "Test Source",
  },
  id: "1234",
  type: "sources",
};

beforeEach(() => {
  ImgixManagementJSMock.mockClear();
  const mockRequest = jest.fn().mockResolvedValue({
    data: [testSource],
    included: [],
    jsonapi: {},
    meta: {},
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
