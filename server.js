import express from "express";
import cors from "cors";
import dontenv from "dotenv";

import router from "./routes/users.route.js";
import notesRouter from "./routes/notes.route.js";
import { connectionDB } from "./config/db.config.js";

// Configrations
dontenv.config();
connectionDB();
const app = express();

// middelewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  }),
);

// // Routes and Endpoints
//  Authentication User route
app.use("/api/v1/auth/users", router);
// Notes route for user authentication
app.use("/api/v1/notes", notesRouter);

// Server Starts Here
const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
