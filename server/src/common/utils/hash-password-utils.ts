import bcrypt from "bcrypt";

export async function hashPassword(plainPassword: string): Promise<string> {
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  return hashPassword;
}

export async function comparePassword(
  plainPassowrd: string,
  hashPassword: string,
): Promise<boolean> {
  const isMatched = await bcrypt.compare(plainPassowrd, hashPassword);
  return isMatched;
}
