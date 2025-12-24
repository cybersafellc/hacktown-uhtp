import Joi from "joi";

const create = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  npsn: Joi.string().required(),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
}).required();

export default { create };
