import Joi from "joi";

const create = Joi.object({
  ticket_id: Joi.string().required(),
  lat: Joi.string().required(),
  long: Joi.string().required(),
  accuracy: Joi.string().required(),
}).required();

export default { create };
