import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

// --------------- Create Token ----------------
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY);
};

// ---------------- Verify Token -------------
const jwtAuthMiddleware = asyncErrorHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    // throw {
    //   status: 404,
    //   statusInfo: "fail",
    //   response: "Token not found",
    // };
    throw new ApiError(404, "fail", "Token not found");

    // return res.status(404).json({
    //   status: 404,
    //   statusInfo: "fail",
    //   response: "Token not found",
    // });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    // throw {
    //   status: 401,
    //   statusInfo: "fail",
    //   response: "Unauthorized request",
    // };
    throw new ApiError(401, "fail", "Unauthorized request");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      //   throw {
      //     status: 401,
      //     statusInfo: "fail",
      //     response: "Invalid Access Token",
      //   };
      throw new ApiError(401, "fail", "Invalid Access Token");
    }

    req.user = decoded;
    next();
  } catch (error) {
    // throw {
    //   status: 401,
    //   statusInfo: "fail",
    //   response: "Invalid Access Token",
    // };
    throw new ApiError(401, "fail", "Invalid Access Token");
  }
});
export { generateToken, jwtAuthMiddleware };
