import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./utils/errorHandler.js";
const app = express();

// ----------- Middlewares ----------
app.use(cors());
app.use(bodyParser.json());

// --------- Import Routes -------------
import user from "./routes/user.routes.js";

// ----------- Routes declaration ---------
app.use("/api/v1/user", user);

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
