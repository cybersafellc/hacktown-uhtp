import Joi from "joi";

const create = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  npsn: Joi.string().required(),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
}).required();

const login = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

const getProfile = Joi.object({
  id: Joi.string().required(),
}).required();

const getSekolahLists = Joi.object({
  id: Joi.string().optional(),
  page: Joi.number().optional(),
  items_per_page: Joi.number().optional(),
  search: Joi.string().optional(),
  desc: Joi.boolean().optional(),
}).required();

const updateSekolah = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone_number: Joi.string().optional(),
}).required();

export default { create, login, getProfile, getSekolahLists, updateSekolah };
