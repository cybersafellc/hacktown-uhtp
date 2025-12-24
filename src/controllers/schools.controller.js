import schoolsService from "../services/schools.service.js";

async function create(req, res, next) {
  try {
    const response = await schoolsService.create(req.body);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

export default { create };
