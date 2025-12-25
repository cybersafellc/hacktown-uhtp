import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";
import statusValidation from "../validations/status.validation.js";
import { validation } from "../validations/validation.js";

async function create(request) {
  const result = await validation(statusValidation.create, request);
  const count = await database.status.count({
    where: {
      name: result.name,
    },
  });
  if (count) throw new ResponseError(400, "status tersebut sudah ada");
  result.id = crypto.randomUUID();
  const responseCreate = await database.status.create({
    data: result,
  });
  return new Response(
    200,
    "berhasil menambahkan status",
    responseCreate,
    null,
    false
  );
}

async function getStatusList(request) {
  const result = await validation(statusValidation.getStatusLists, request);
  let response;
  let custom_data = {};
  if (result.id) {
    response = await database.status.findUnique({
      where: {
        id: result.id,
      },
    });
    if (!response) throw new ResponseError(400, "status tidak ditemukan");
    return new Response(200, "list status", response, null, false);
  } else {
    const total_user = await database.status.count({
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
    response = await database.status.findMany({
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
      "list status",
      { data: response, pagination: custom_data },
      null,
      false
    );
  }
}

export default { create, getStatusList };
