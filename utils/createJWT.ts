import jwt from "jsonwebtoken";
import type { TUser } from "@/types/entities";

const createToken = (user: TUser, chatId: number) => {
  const {
    public: { jwtSecret },
  } = useRuntimeConfig();

  const token = jwt.sign({ ...user, chatId }, jwtSecret, { expiresIn: "24h" });

  return token;
};

export default createToken;
