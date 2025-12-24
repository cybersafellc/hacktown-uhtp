import express from "express";
import schoolsController from "../controllers/schools.controller.js";

const router = express.Router();
router.post("/schools", schoolsController.create);
export default router;
