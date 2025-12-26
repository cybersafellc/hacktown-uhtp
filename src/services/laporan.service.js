import { validation } from "../validations/validation.js";
import laporanValidation from "../validations/laporan.validation.js";
import { database } from "../app/database.js";
import { Response, ResponseError } from "../utils/response.js";
import { generateTicketId } from "../utils/mix.js";
import { transporter } from "../app/mail.js";
import { logger } from "../app/logging.js";
import fs from "fs/promises";

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

  const images = result.attachments;
  result.attachments = undefined;

  let createResponse = await database.laporan.create({
    data: result,
    include: {
      sekolah: true,
      kategori_bullying: true,
      status: true,
    },
  });

  if (images) {
    for (const img of images) {
      await database.attachments.create({
        data: {
          id: crypto.randomUUID(),
          laporan_id: createResponse.id,
          path: img,
        },
      });
    }

    createResponse = await database.laporan.findUnique({
      where: {
        id: createResponse.id,
      },
      include: {
        sekolah: true,
        kategori_bullying: true,
        status: true,
        attachments: true,
      },
    });
  }

  // pengiriman email
  const fromEmail = process.env.USER_SMTP;
  let body = await fs.readFile("src/utils/mail.html", "utf-8");
  body = body.replace("{{name}}", result.nama_lengkap);
  body = body.replace("{{kode}}", result.ticket_id);

  transporter
    .sendMail({
      from: `'"Sekolah Aman" <${fromEmail}>'`,
      to: `${result.email}`,
      subject: `Laporan Diterima - ${result.ticket_id}`,
      html: body,
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
        attachments: true,
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
        attachments: true,
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

async function uploadFile(request) {
  try {
    const result = await validation(laporanValidation.uploadFile, request);
    return new Response(
      200,
      "berhasil mengupload file, berikut link filenya",
      result,
      null,
      false
    );
  } catch (error) {
    next(error);
  }
}

async function getLaporanWithTicket(request) {
  const result = await validation(
    laporanValidation.getLaporanWithTicket,
    request
  );
  const data = await database.laporan.findFirst({
    where: {
      ticket_id: result.ticket_id,
    },
    include: {
      sekolah: true,
      kategori_bullying: true,
      status: true,
      attachments: true,
    },
  });
  if (!data) throw new ResponseError(400, "ticket id tidak ditemukan");
  return new Response(
    200,
    "berhasil mendapatkan laporan ber id " + result.ticket_id,
    data,
    null,
    false
  );
}

async function update(request) {
  const result = await validation(laporanValidation.update, request);
  const countLpr = await database.laporan.count({
    where: {
      id: result.id,
    },
  });
  if (!countLpr)
    throw new ResponseError(400, "id laporan yang anda berikan tidak valid");

  if (result?.status_id) {
    const count = await database.status.count({
      where: {
        id: result.status_id,
      },
    });
    if (!count)
      throw new ResponseError(400, "status id yang anda berikan tidak valid");
  }

  const responseUpdate = await database.laporan.update({
    data: result,
    where: {
      id: result.id,
    },
  });

  return new Response(200, "berhasil update", responseUpdate, null, false);
}

export default {
  create,
  getLaporans,
  uploadFile,
  getLaporanWithTicket,
  update,
};
