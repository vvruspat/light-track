import jwt from "jsonwebtoken";
import type { TUser } from "@/types/entities";

const createToken = (user: TUser, chatId: number) => {
  const {
    jwtSecret,
  } = useRuntimeConfig();

  const token = jwt.sign({ ...user, chatId }, jwtSecret, { expiresIn: "48h" });

  return token;
};

export default createToken;
