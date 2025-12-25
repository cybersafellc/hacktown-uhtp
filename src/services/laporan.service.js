import { validation } from "../validations/validation.js";
import laporanValidation from "../validations/laporan.validation.js";
import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";
import { generateTicketId } from "../utils/mix.js";
import { transporter } from "../app/mail.js";
import { logger } from "../app/logging.js";

async function create(request) {
  const result = await validation(laporanValidation.create, request);
  // cek id relasi
  const countSekolah = await database.sekolah.count({
    where: {
      id: result.sekolah_id,
    },
  });
  if (!countSekolah) throw new ResponseError(400, "sekolah_id tidak valid");
  const countKategori = await database.kategori_bullying.count({
    where: {
      id: result.kategori_id,
    },
  });
  if (!countKategori) throw new ResponseError(400, "kategori_id tidak valid");

  //set auto data
  const status = await database.status.findFirst({
    where: {
      name: {
        contains: process.env.KEYWORD_FOR_DEFAULT_STATUS,
      },
    },
  });
  result.id = crypto.randomUUID();
  result.status_id = status.id;
  result.ticket_id = generateTicketId();
  result.pesan_balasan = " ";
  result.catatan_internal = " ";

  const createResponse = await database.laporan.create({
    data: result,
    include: {
      sekolah: true,
      kategori_bullying: true,
      status: true,
    },
  });

  transporter
    .sendMail({
      from: `"Sekolah Aman" <sekolah-aman@belibelionli.com>`,
      to: `${result.email}`,
      subject: `Laporan Diterima - ${result.ticket_id}`,
      html: `<!DOCTYPE html><html lang="id"><head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Lapor Bullying</title> <style> * { box-sizing: border-box; font-family: system-ui, sans-serif; } body { margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; background: #f5f7fb; } .box { background: #fff; width: 320px; padding: 28px; border-radius: 14px; box-shadow: 0 12px 30px rgba(0,0,0,.08); } h2 { margin: 0 0 20px; text-align: center; font-size: 1.2rem; } input, select { width: 100%; padding: 12px; margin-bottom: 14px; border-radius: 10px; border: 1px solid #e5e7eb; outline: none; font-size: .9rem; } input:focus, select:focus { border-color: #4f46e5; } button { width: 100%; padding: 12px; border: none; border-radius: 10px; background: #4f46e5; color: #fff; font-weight: 600; cursor: pointer; } button:hover { background: #4338ca; } </style></head><body> <div class="box"> <h2>Lapor Bullying - Ticket</h2> <h2 style="text-align: center;">${result.ticket_id}</h2> </div></body></html>`, // HTML version of the message
    })
    .then((data) => {
      logger.info("berhasil mengirim email");
    })
    .catch((err) => {
      logger.error(err.message);
    });

  return new Response(
    200,
    "berhasil memproses laporan anda",
    createResponse,
    null,
    false
  );
}

async function getLaporans(request) {
  const result = await validation(laporanValidation.getLaporans, request);
  console.log(result);
  let response;
  let custom_data = {};
  if (result.id) {
    response = await database.laporan.findUnique({
      where: {
        sekolah_id: result.user_id,
        id: result.id,
      },
      include: {
        sekolah: true,
        kategori_bullying: true,
        status: true,
      },
    });
    if (!response) throw new ResponseError(400, "laporan tidak ditemukan");
    return new Response(200, "list laporan", response, null, false);
  } else {
    const total_user = await database.laporan.count({
      where: {
        sekolah_id: result.user_id,
        OR: [
          {
            nama_lengkap: {
              contains: result?.search || "",
            },
          },
          {
            ticket_id: {
              contains: result?.search || "",
            },
          },
          {
            email: {
              contains: result?.search || "",
            },
          },
        ],
      },
    });
    response = await database.laporan.findMany({
      orderBy: {
        update_at: result?.desc ? "desc" : "asc",
      },
      where: {
        sekolah_id: result.user_id,
        OR: [
          {
            nama_lengkap: {
              contains: result?.search || "",
            },
          },
          {
            ticket_id: {
              contains: result?.search || "",
            },
          },
          {
            email: {
              contains: result?.search || "",
            },
          },
        ],
      },
      include: {
        sekolah: true,
        kategori_bullying: true,
        status: true,
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
      "list laporan",
      { data: response, pagination: custom_data },
      null,
      false
    );
  }
}

export default { create, getLaporans };
