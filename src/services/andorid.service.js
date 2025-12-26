import androidValidation from "../validations/android.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";

async function create(request) {
  const result = await validation(androidValidation.create, request);
  const laporan = await database.laporan.findFirst({
    where: {
      ticket_id: result.ticket_id,
    },
  });
  if (!laporan)
    throw new ResponseError(400, "ticket id yang anda berikan tidak valid");
  // save data
  result.id = crypto.randomUUID();
  const responseCreate = await database.gps.create({
    data: {
      id: result.id,
      laporan_id: laporan.id,
      lat: result.lat,
      long: result.long,
      accuracy: result.accuracy,
    },
  });
  return new Response(
    200,
    "berhasil menambahkan data gps",
    responseCreate,
    null,
    false
  );

  // logika notification to whatsapp
}

export default { create };
