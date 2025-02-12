import type { H3Event } from "h3";
import jwt from "jsonwebtoken";
import type { TUser } from "@/types/entities";

export default function useLightTrackSession(event: H3Event) {
  const jwtToken = event.headers.get("Authorization");
  const {
    public: { jwtSecret },
  } = useRuntimeConfig();

  if (jwtToken) {
    if (jwt.verify(jwtToken, jwtSecret)) {
      const sessionData = jwt.decode(jwtToken) as TUser & { chatId: number };

      return {
        ...sessionData,
      };
    } else {
      throw new Error("Invalid JWT token");
    }
  } else {
    throw new Error("JWT token is required");
  }
}
