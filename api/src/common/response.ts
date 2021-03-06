
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

export default class Http {
  static STATUS_OK = 200;
  static STATUS_RESOURCE_CREATED = 200;
  static STATUS_FAILED = 200;
  static createResponse(data: any, code = 200) {
      const successCodes = [200, 201];
      return {
          success: successCodes.includes(code) ? true : false,
          data: typeof data === "boolean" ? {} : data,
      };
  }
}
