process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "8080";
process.env.API_VERSION = process.env.API_VERSION || "v1";

export default {
  port: parseInt(process.env.PORT, 10),
  apiVersion: `${process.env.API_VERSION}` || "v1",
  jwt_sec: process.env.JWT_SECRET || "mali-secret",
  jwt_expire: parseInt(process.env.TOKEN_EXPIRES_IN, 10) || 604800
};
