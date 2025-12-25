import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";
import kategoriBullyingValidation from "../validations/kategori-bullying.validation.js";
import { validation } from "../validations/validation.js";

async function create(request) {
  const result = await validation(kategoriBullyingValidation.create, request);
  const count = await database.kategori_bullying.count({
    where: {
      name: result.name,
    },
  });
  if (count)
    throw new ResponseError(400, "kategori bullying tersebut sudah ada");
  result.id = crypto.randomUUID();
  const responseCreate = await database.kategori_bullying.create({
    data: result,
  });
  return new Response(
    200,
    "berhasil menambahkan kategori bullying",
    responseCreate,
    null,
    false
  );
}

async function getKategoriLists(request) {
  const result = await validation(kategoriBullyingValidation.getKategoriLists, request);
  let response;
  let custom_data = {};
  if (result.id) {
    response = await database.kategori_bullying.findUnique({
      where: {
        id: result.id,
      },
    });
    if (!response)
      throw new ResponseError(400, "kategori bullying tidak ditemukan");
    return new Response(200, "list kategori bullying", response, null, false);
  } else {
    const total_user = await database.kategori_bullying.count({
      where: {
        OR: [
          {
            name: {
              contains: result?.search || "",
            },
          },
        ],
      },
    });
    response = await database.kategori_bullying.findMany({
      orderBy: {
        update_at: result?.desc ? "desc" : "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: result?.search || "",
            },
          },
        ],
      },
      skip: ((result?.page || 1) - 1) * (result?.items_per_page || 10),
      take: result?.items_per_page || 10,
    });

    custom_data.items_per_page = result.items_per_page || 10;
    custom_data.page = result.page || 1;
    custom_data.max_page = Math.ceil(
      total_user / (result.items_per_page || 10)
    );
    custom_data.search = result.search;
    custom_data.total_data = total_user;
    return new Response(
      200,
      "list kategori bullyying",
      { data: response, pagination: custom_data },
      null,
      false
    );
  }
}

export default { create, getKategoriLists };
