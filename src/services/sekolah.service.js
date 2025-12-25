import { database } from "../app/database.js";
import { ResponseError, Response } from "../utils/response.js";
import sekolahValidation from "../validations/sekolah.validation.js";
import { validation } from "../validations/validation.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

async function create(request) {
  const result = await validation(sekolahValidation.create, request);
  // username validation
  const countUsername = await database.sekolah.count({
    where: {
      username: result.username,
    },
  });
  if (countUsername) throw new ResponseError(400, "username sudah ada");
  // sekolah validation
  const countSekolah = await database.sekolah.count({
    where: {
      npsn: result.npsn,
    },
  });
  if (countSekolah) throw new ResponseError(400, "npsn sudah terdaftar");
  // ekse
  result.id = crypto.randomUUID();
  result.password = await bcrypt.hash(result.password, 10);
  const responseCreate = await database.sekolah.create({
    data: result,
  });
  return new Response(
    200,
    "berhasil mendaftar sekolah",
    responseCreate,
    null,
    false
  );
}

async function login(request) {
  const result = await validation(sekolahValidation.login, request);
  const user = await database.sekolah.findFirst({
    where: {
      username: result.username,
    },
  });
  if (user && (await bcrypt.compare(result.password, user.password))) {
    const access_token = await Jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_AUTH_SCREET,
      {
        expiresIn: "8h",
      }
    );
    return new Response(
      200,
      "berhasil login",
      { access_token: access_token },
      null,
      false
    );
  } else {
    throw new ResponseError(400, "kombinasi username dan password salah");
  }
}

async function verifyAccessToken() {
  return new Response(200, "token terverifikasi", null, null, false);
}

async function getProfile(request) {
  const result = await validation(sekolahValidation.getProfile, request);
  const user = await database.sekolah.findUnique({
    where: {
      id: result.id,
    },
  });
  return new Response(
    200,
    "berhasi mendaspatkan data sekolah anda",
    user,
    null,
    false
  );
}

async function getSekolahLists(request) {
  const result = await validation(sekolahValidation.getSekolahLists, request);
  let response;
  let custom_data = {};
  if (result.id) {
    response = await database.sekolah.findUnique({
      where: {
        id: result.id,
      },
    });
    if (!response) throw new ResponseError(400, "sekolah tidak ditemukan");
    return new Response(200, "list sekolah", response, null, false);
  } else {
    const total_user = await database.sekolah.count({
      where: {
        OR: [
          {
            name: {
              contains: result?.search || "",
            },
          },
          {
            npsn: {
              contains: result?.search || "",
            },
          },
        ],
      },
    });
    response = await database.sekolah.findMany({
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
          {
            npsn: {
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
      "list sekolah",
      { data: response, pagination: custom_data },
      null,
      false
    );
  }
}

export default {
  create,
  login,
  verifyAccessToken,
  getProfile,
  getSekolahLists,
};
