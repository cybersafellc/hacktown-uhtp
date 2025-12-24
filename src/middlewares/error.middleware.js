import { logger } from "../app/logging.js";
import { Response, ResponseError } from "../utils/response.js";

async function RouteNotFound(req, res, next) {
  try {
    throw new ResponseError(404, "page not found");
  } catch (error) {
    next(error);
  }
}

async function ErrorHandler(err, req, res, next) {
  try {
    if (err instanceof ResponseError) {
      const response = new Response(err.status, err.message, null, null, true);
      res.status(response.status).json(response).end();
    } else {
      const response = new Response(500, err.message, null, null, false);
      res.status(response.status).json(response).end();
      logger.error(err.message);
    }
  } catch (error) {
    next(error);
  }
}

export default { RouteNotFound, ErrorHandler };
