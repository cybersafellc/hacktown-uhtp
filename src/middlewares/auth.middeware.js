import Jwt from "jsonwebtoken";
import { ResponseError } from "../utils/response.js";

async function authorization(req, res, next) {
  try {
    const access_token =
      (await req.headers["authorization"]?.split(" ")[1]) ||
      req.cookies["access_token"];

    const decode = await Jwt.verify(
      access_token,
      process.env.JWT_AUTH_SCREET,
      function (err, decode) {
        return decode;
      }
    );
    if (!decode)
      throw new ResponseError(
        400,
        "akses token tidak valid, silahkan login ulang"
      );
    req.id = await decode.id;
    next();
  } catch (error) {
    next(error);
  }
}

export { authorization };
