import andoridService from "../services/andorid.service.js";
import { Response } from "../utils/response.js";
import fs from "fs/promises";

async function alertNotification(req, res, next) {
  try {
    const response = await andoridService.create(req.body);
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
