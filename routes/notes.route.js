import express from "express";
import {
  getAllNotes,
  getSingleNote,
  addNote,
  editNote,
  deleteNote,
  notePing,
  searchNote,
} from "../controllers/notes.controle.js";
import { validateToken } from "../middlewares/verifyUserToken.js";
const router = express.Router();

router.use(validateToken);
router.get("/search", searchNote);
router.get("/", getAllNotes).get("/:id", getSingleNote);
router.post("/", addNote).put("/:id", editNote).delete("/:id", deleteNote);
router.post("/ping/:id", notePing);

export default router;
