import json from "jsonwebtoken";
import { config } from "../configs/config.js";

export const createToken = (payload) => {
  const token = json.sign(payload, config.jwSecret, { expiresIn: "1d" });
  return {token};
};

export const verifyToken = (token) => {
  const payload = json.verify(token, config.jwSecret);
  return payload;
};
