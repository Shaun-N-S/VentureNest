import { Response } from "express";

export function setRefreshTokenCookie(res: Response, refreshToken: string) {
  res.cookie("RefreshToken", refreshToken, {
    httpOnly: true, // protects from XSS
    secure: process.env.NODE_ENV === "production", // only HTTPS in production
    sameSite: "strict", // prevent CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
}
