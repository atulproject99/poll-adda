export interface RegisterRequestType {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequestType {
  email: string;
  password: string;
}
export interface VerifyEmailRequestType {
  email: string;
  verifyToken: string;
  code: string;
}
export interface UserInfo {
  userId?: string;
  name: string;
  email: string;
  password?: string | null;
  googleId?: string | null;
  avatar?: string | null;
  refreshToken?: string | null;
  verifyToken?: string | null;
  verified?: boolean | null;
}
