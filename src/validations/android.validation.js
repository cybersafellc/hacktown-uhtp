import Joi from "joi";

const create = Joi.object({
  ticket_id: Joi.string().required(),
  lat: Joi.string().required(),
  long: Joi.string().required(),
  accuracy: Joi.string().required(),
}).required();

const getData = Joi.object({
  user_id: Joi.string().required(),
  id: Joi.string().optional(),
  page: Joi.number().optional(),
  items_per_page: Joi.number().optional(),
  search: Joi.string().optional(),
  desc: Joi.boolean().optional(),
}).required();

export default { create, getData };
