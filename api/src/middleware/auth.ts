import jwt from "jsonwebtoken";
import configs from "../config";

const { jwt_sec } = configs;

export default function auth(
  request: any,
  response: any,
  next?: (err?: any) => any
): any {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(400).json({
      success: false,
      data: {
        code: 400,
        message: "Missing authorization in request headers.",
      },
    });
  } else {
    let decodedToken;
    try {
      decodedToken = jwt.verify(authorization, jwt_sec);
    } catch (err) {
      return response.status(400).json({
        success: false,
        data: {
          code: 400,
          message: "Invalid token.",
        },
      });
    }
    if (!decodedToken) {
      return response.status(400).json({
        success: false,
        data: {
          code: 400,
          message: "Invalid token.",
        },
      });
    }
    request.user = decodedToken;
    return next();
  }
}
