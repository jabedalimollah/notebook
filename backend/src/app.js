import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./utils/errorHandler.js";
import { jwtAuthMiddleware } from "./middlewares/auth.middleware.js";
const app = express();

// ----------- Middlewares ----------
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());

// --------- Import Routes -------------
import user from "./routes/user.routes.js";
import notes from "./routes/notes.routes.js";

// ----------- Routes declaration ---------
app.use("/api/v1/user", user);
app.use("/api/v1/notes", jwtAuthMiddleware, notes);

// ----------- It is used for incorrect endpoint and wrong api requests ----------
app.use("*", (req, res, next) => {
  // =============== x ==================
  //   const err = new Error(`Can't find ${req.originalUrl} on the server`);
  //   err.status = "fail";
  //   err.statusCode = 404;
  const err = new ApiError(
    404,
    "fail",
    `Can't find ${req.originalUrl} on the server`
  );
  next(err);
});

// ----------------- Error handler ---------
app.use(errorHandler);

// --------- Export ----------
export default app;
