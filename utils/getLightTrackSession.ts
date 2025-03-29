import type { H3Event } from "h3";
import { jwtVerify } from "jose";
import type { TUser } from "@/types/entities";

type SessionData = TUser & { chatId: number };

export default async function getLightTrackSession(event: H3Event) {
  const jwtToken = event.headers.get("Authorization");
  const { jwtSecret } = useRuntimeConfig();

  if (jwtToken) {
    const secret = Buffer.from(jwtSecret);
    const { payload } = await jwtVerify(jwtToken, secret);

    return payload as SessionData;
  } else {
    throw new Error("JWT token is required");
  }
}
