import Joi from "joi";

const create = Joi.object({
  nama_lengkap: Joi.string().required(),
  sekolah_id: Joi.string().required(),
  kelas: Joi.string().required(),
  email: Joi.string().required(),
  whatsapp: Joi.string().required(),
  lokasi: Joi.string().required(),
  kategori_id: Joi.string().required(),
  deskripsi_kejadian: Joi.string().required(),
  attachments: Joi.array().items(Joi.string()).optional(),
}).required();

const getLaporans = Joi.object({
  user_id: Joi.string().required(),
  id: Joi.string().optional(),
  page: Joi.number().optional(),
  items_per_page: Joi.number().optional(),
  search: Joi.string().optional(),
  desc: Joi.boolean().optional(),
}).required();

const uploadFile = Joi.object({
  path: Joi.string().required(),
}).required();

export default { create, getLaporans, uploadFile };
