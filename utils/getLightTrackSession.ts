import type { TUser } from "@/types/entities";
import type { H3Event } from "h3";
import { jwtVerify } from "jose";

type SessionData = TUser & { chatId: number };

export default async function getLightTrackSession(event: H3Event) {
  const jwtToken = event.headers.get("Authorization");
  const { jwtSecret } = useRuntimeConfig();

  if (jwtToken) {
    const secret = Buffer.from(jwtSecret);
    const { payload } = await jwtVerify(jwtToken, secret);

    return payload as SessionData;
  }
  throw new Error("JWT token is required");
}
