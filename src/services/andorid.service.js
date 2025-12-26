import androidValidation from "../validations/android.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import { ResponseError } from "../utils/response.js";

async function create(request) {
  const result = await validation(androidValidation.create, request);
  const laporan = await database.laporan.findFirst({
    where: {
      ticket_id: result.ticket_id,
    },
  });
  if (!laporan)
    throw new ResponseError(400, "ticket id yang anda berikan tidak valid");
}
