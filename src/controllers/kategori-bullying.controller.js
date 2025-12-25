import kategoriBullyingService from "../services/kategori-bullying.service.js";

async function create(req, res, next) {
  try {
    const response = await kategoriBullyingService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function getKategoriLists(req, res, next) {
  try {
    const response = await kategoriBullyingService.getKategoriLists({
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

export default { create, getKategoriLists };
