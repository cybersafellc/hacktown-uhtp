import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
}).required();

const getKategoriLists = Joi.object({
  id: Joi.string().optional(),
  page: Joi.number().optional(),
  items_per_page: Joi.number().optional(),
  search: Joi.string().optional(),
  desc: Joi.boolean().optional(),
}).required();

export default { create, getKategoriLists };
