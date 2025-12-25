import statusService from "../services/status.service.js";

async function create(req, res, next) {
  try {
    const response = await statusService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function getStatusList(req, res, next) {
  try {
    const response = await statusService.getStatusList({
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

export default { create, getStatusList };
