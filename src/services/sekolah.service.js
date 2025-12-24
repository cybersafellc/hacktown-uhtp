import { database } from "../app/database.js";
import sekolahValidation from "../validations/sekolah.validation.js";
import { validation } from "../validations/validation.js";

async function create(request) {
  const result = await validation(sekolahValidation.create, request);
  const count = await database.sekolah.count({
    where: {
        
    }
  })
}
