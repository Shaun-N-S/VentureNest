import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ventureNest",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  FRONTEND_URL: process.env.FRONTEND_URL,
  GOOGLE_MAIL: process.env.GOOGLE_MAIL,
  GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
  REDIS_URL: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
