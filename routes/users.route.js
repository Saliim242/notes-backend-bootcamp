import express from "express";

import { signup, signin, current } from "../controllers/user.controle.js";
import { validateToken } from "../middlewares/verifyUserToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.get("/me", validateToken, current);

export default router;
