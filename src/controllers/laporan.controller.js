import laporanService from "../services/laporan.service.js";

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

export default { create, getLaporans };
