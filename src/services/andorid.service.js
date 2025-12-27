import androidValidation from "../validations/android.validation.js";
import { validation } from "../validations/validation.js";
import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";
import { wa } from "../app/whatsapp.js";
import { logger } from "../app/logging.js";

async function create(request) {
  const result = await validation(androidValidation.create, request);
  const laporan = await database.laporan.findFirst({
    where: {
      ticket_id: result.ticket_id,
    },
    include: {
      sekolah: true,
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
  // logika notification to whatsapp
  try {
    const nomor = `${laporan.sekolah.phone_number}@c.us`;
    await wa.sendMessage(
      nomor,
      `
    Anak Kita Dalam Bahaya !
    Selamatkan Anak Kita Sekarang !
    
    Nama  : ${laporan.nama_lengkap}
    Kelas : ${laporan.kelas}

    Track : https://www.google.com/maps?q=${responseCreate.lat},${responseCreate.long}
    `
    );
  } catch (error) {
    logger.error(error.message);
  }
  //
  return new Response(
    200,
    "berhasil menambahkan data gps",
    responseCreate,
    null,
    false
  );
}

async function getData(request) {
  const result = await validation(androidValidation.getData, request);
  let response;
  let custom_data = {};
  if (result.id) {
    response = await database.gps.findUnique({
      where: {
        id: result.id,
        laporan: {
          sekolah_id: result.user_id,
        },
      },
      include: {
        laporan: true,
      },
    });
    if (!response) throw new ResponseError(400, "gps tidak ditemukan");
    return new Response(200, "list gps", response, null, false);
  } else {
    const total_user = await database.gps.count({
      where: {
        laporan: {
          sekolah_id: result.user_id,
        },
        OR: [
          {
            lat: {
              contains: result?.search || "",
            },
          },
          {
            long: {
              contains: result?.search || "",
            },
          },
          {
            accuracy: {
              contains: result?.search || "",
            },
          },
        ],
      },
    });
    response = await database.gps.findMany({
      orderBy: {
        update_at: result?.desc ? "desc" : "asc",
      },
      where: {
        laporan: {
          sekolah_id: result.user_id,
        },
        OR: [
          {
            lat: {
              contains: result?.search || "",
            },
          },
          {
            long: {
              contains: result?.search || "",
            },
          },
          {
            accuracy: {
              contains: result?.search || "",
            },
          },
        ],
      },
      include: {
        laporan: true,
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
      "list gps",
      { data: response, pagination: custom_data },
      null,
      false
    );
  }
}

export default { create, getData };
