import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";
import schoolsValidation from "../validations/schools.validation.js";
import { validation } from "../validations/validation.js";
import bcrypt from "bcrypt";

async function create(request) {
  const result = await validation(schoolsValidation.create, request);
  const count = await database.school.count({
    where: {
      name: result.name,
    },
  });
  if (count) throw new ResponseError(400, "sekolah sudah terdaftar");
  result.id = crypto.randomUUID();
  result.password = await bcrypt.hash(result.password, 10);
  const createResponse = await database.school.create({
    data: result,
    select: {
      id: true,
      username: true,
      name: true,
      phone_number: true,
    },
  });
  return new Response(
    200,
    "berhasil mendaftarkan sekolah",
    createResponse,
    null,
    false
  );
}

export default { create };
