import express from "express";
import schoolsController from "../controllers/schools.controller.js";

const router = express.Router();
// router.post("/schools", schoolsController.create);
router.post("/sekolah");
export default router;
