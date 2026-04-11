import express from "express";
import { getAnalytics } from "../controllers/analytics.controller.js";
import { validateToken } from "../middlewares/verifyUserToken.js";

const router = express.Router();

router.get("/", validateToken, getAnalytics);

export default router;
