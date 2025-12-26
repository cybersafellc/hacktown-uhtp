import sekolahService from "../services/sekolah.service.js";

async function create(req, res, next) {
  try {
    const response = await sekolahService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}
async function login(req, res, next) {
  try {
    const response = await sekolahService.login(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function verifyAccessToken(req, res, next) {
  try {
    const response = await sekolahService.verifyAccessToken();
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  try {
    const response = await sekolahService.getProfile({
      id: req.id,
    });
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function getSekolahLists(req, res, next) {
  try {
    const response = await sekolahService.getSekolahLists({
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

async function updateSekolah(req, res, next) {
  try {
    req.body.id = await req.id;
    const response = await sekolahService.updateSekolah(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  login,
  verifyAccessToken,
  getProfile,
  getSekolahLists,
  updateSekolah,
};
