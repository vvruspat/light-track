import type { TUser } from "@/types/entities";
import { SignJWT } from "jose";

const createToken = async (user: TUser, chatId: number) => {
  const { jwtSecret } = useRuntimeConfig();

  const token = await new SignJWT({ ...user, chatId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(Buffer.from(jwtSecret));

  return token;
};

export default createToken;
