import { Response } from "../utils/response.js";
import { transporter } from "../app/mail.js";
import router from "../routers/api.js";

async function dashboardBk(req, res, next) {
  try {
    const data = {
      kategori: { fisik: 24, Verbal: 2, Cyber: 6, Lainnya: 14 },
      kelas: {
        10: 12,
        11: 14,
        12: 20,
      },
      data_reports: {
        siswa_melapor: 46,
        diproses: 4,
        selesai: 17,
        ditolak: 25,
      },
    };
    const response = new Response(200, "berhasil mersponse", data, null, false);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function laporan(req, res, next) {
  try {
    const data = [
      {
        tanggal: new Date(),
        nama_pelapor: "Reihan",
        kategori: {
          name: "Kekerasan Fisik",
        },
        judul: "Diejek sampe nangis",
        status: "Menunggu",
        lokasi: "Di Kantin",
        detail_laporan: "Saya di ejek karena saya tidak sama dengan mereka",
        bukti_foto: "https://api-hacktown.rusnandapurnama.com/img/image.png",
      },
    ];
    const response = new Response(200, "berhasil", data, null, false);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function detailsLaporan(req, res, next) {
  try {
    const data = {
      nama_pelapor: "Reihan",
      kategori: {
        id: crypto.randomUUID(),
        name: "sedang di proses",
      },
      lokasi: "kantin",
      tanggal: new Date(),
      detail_laporan: "Saya di ejek karena saya tidak sama dengan mereka",
      bukti_foto: [
        "https://api-hacktown.rusnandapurnama.com/img/image.png",
        "https://api-hacktown.rusnandapurnama.com/img/image1.png",
      ],
    };
    const response = new Response(200, "success", data, null, false);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function status(req, res, next) {
  try {
    res.status(200).send("testing berhasil");
    const data = [
      {
        id: crypto.randomUUID(),
        name: "sedang di proses",
      },
      {
        id: crypto.randomUUID(),
        name: "pemanggilan orang tua",
      },
      {
        id: crypto.randomUUID(),
        name: "selesai / ditutup",
      },
      {
        id: crypto.randomUUID(),
        name: "laporan ditolak (hoax)",
      },
    ];
    const response = new Response(200, "berhasil", data, null, false);
    res.status(response.status).json(response).end();
  } catch (error) {
    next(error);
  }
}

async function submitFormLaporan(req, res, next) {
  try {
    transporter
      .sendMail({
        from: `"Sekolah Aman" <sekolah-aman@belibelionli.com>`,
        to: await req.body.email,
        subject: "Berikut Kode Tikcet Anda, Simpan Baik-baik!",
        html: `<!DOCTYPE html><html lang="id"><head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Lapor Bullying</title> <style> * { box-sizing: border-box; font-family: system-ui, sans-serif; } body { margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; background: #f5f7fb; } .box { background: #fff; width: 320px; padding: 28px; border-radius: 14px; box-shadow: 0 12px 30px rgba(0,0,0,.08); } h2 { margin: 0 0 20px; text-align: center; font-size: 1.2rem; } input, select { width: 100%; padding: 12px; margin-bottom: 14px; border-radius: 10px; border: 1px solid #e5e7eb; outline: none; font-size: .9rem; } input:focus, select:focus { border-color: #4f46e5; } button { width: 100%; padding: 12px; border: none; border-radius: 10px; background: #4f46e5; color: #fff; font-weight: 600; cursor: pointer; } button:hover { background: #4338ca; } </style></head><body> <div class="box"> <h2>Lapor Bullying - Ticket</h2> <h2 style="text-align: center;">${Math.floor(
          10000000 + Math.random() * 90000000
        )}</h2><h5>Tracking Site : http://localhost:8000/tracking</h5> </div></body></html>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).send("sukses");
  } catch (error) {
    next(error);
  }
}

export default {
  dashboardBk,
  laporan,
  status,
  detailsLaporan,
  submitFormLaporan,
};
