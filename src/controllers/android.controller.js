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
    const response = await andoridService.getData({
      user_id: await req.id,
      search: req?.query?.search,
      id: req?.query?.id,
      page: req?.query?.page,
      items_per_page: req?.query?.items_per_page,
      desc: req?.query?.desc,
    });
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { alertNotification, getData };
