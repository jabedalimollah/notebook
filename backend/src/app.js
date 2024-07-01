import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(cors());
app.use(bodyParser.json());

// --------- Import Routes -------------
import user from "./routes/user.routes.js";

// ----------- Routes declaration ---------
app.use("/api/v1/user", user);

export default app;
