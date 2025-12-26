import { Response } from "../utils/response.js";

async function alertNotification(req, res, next) {
  try {
    console.log(req.body);
    const response = new Response(
      200,
      "berhasil meresponse",
      req.body,
      null,
      false
    );
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { alertNotification };
