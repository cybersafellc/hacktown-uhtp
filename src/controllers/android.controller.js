import { Response } from "../utils/response.js";
import fs from "fs/promises";

async function alertNotification(req, res, next) {
  try {
    console.log(req.body);
    await fs.appendFile(
      "private/gps.txt",
      `${req.body.lat},${req.body.long},${req.body.accuracy}\n`,
      "utf-8"
    );
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

async function getData(req, res, next) {
  try {
    const data = (await fs.readFile("private/gps.txt", "utf-8"))
      .trim()
      .split("\n")
      .map((d) => d.trim());

    let dataForResponse = [];
    for (const d of data) {
      const gtu = d.split(",");
      dataForResponse.push({
        lat: gtu[0],
        long: gtu[1],
        accuracy: gtu[2],
      });
    }
    const response = new Response(
      200,
      "berhasil meresponse",
      dataForResponse,
      null,
      false
    );
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { alertNotification, getData };
