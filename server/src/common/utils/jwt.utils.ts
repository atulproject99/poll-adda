import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  const token: string = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
  return token;
};
export const generateRefreshToken = (payload: object) => {
  const token: string = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyAccessToken = (token: string): any => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
};
