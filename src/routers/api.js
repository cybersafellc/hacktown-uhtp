import express from "express";
import schoolsController from "../controllers/schools.controller.js";
import sekolahController from "../controllers/sekolah.controller.js";
import { authorization } from "../middlewares/auth.middeware.js";
import kategoriBullyingController from "../controllers/kategori-bullying.controller.js";
import statusController from "../controllers/status.controller.js";
import laporanController from "../controllers/laporan.controller.js";
import { uploadFile } from "../middlewares/uploadFile.middleware.js";

const router = express.Router();
// router.post("/schools", schoolsController.create);
router.post("/sekolah", sekolahController.create);
router.post("/sekolah/login", sekolahController.login);
router.get(
  "/sekolah/verify-token",
  authorization,
  sekolahController.verifyAccessToken
);
// wajib sertakan token
router.get("/sekolah", authorization, sekolahController.getProfile);
router.get("/laporans", authorization, laporanController.getLaporans);
router.put("/laporan", authorization, laporanController.update);

// public
router.get("/sekolahs", sekolahController.getSekolahLists);
router.get("/kategori-bullying", kategoriBullyingController.getKategoriLists);
router.get("/status", statusController.getStatusList);
router.post("/img", uploadFile, laporanController.uploadFile);
router.post("/laporan", laporanController.create); // disini dlu ya
router.get("/laporan/ticket/:id", laporanController.getLaporanWithTicket);

// temporarily api
router.post("/kategori-bullying", kategoriBullyingController.create);
router.post("/status", statusController.create);

export default router;
