import laporanService from "../services/laporan.service.js";
import { ResponseError } from "../utils/response.js";

async function create(req, res, next) {
  try {
    const response = await laporanService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function getLaporans(req, res, next) {
  try {
    const response = await laporanService.getLaporans({
      user_id: req.id,
      id: req.query.id,
      page: req.query.page,
      items_per_page: req.query.items_per_page,
      search: req.query.search,
      desc: req.query.desc,
    });
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function uploadFile(req, res, next) {
  try {
    if (!req?.file?.filename)
      throw new ResponseError(
        400,
        "file dibutuhkan, anda tidak mengirim file apapun"
      );
    const response = await laporanService.uploadFile({
      path: "/img/" + req?.file?.filename,
    });
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function getLaporanWithTicket(req, res, next) {
  try {
    const response = await laporanService.getLaporanWithTicket({
      ticket_id: req.params.id,
    });
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const response = await laporanService.update(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  getLaporans,
  uploadFile,
  getLaporanWithTicket,
  update,
};
