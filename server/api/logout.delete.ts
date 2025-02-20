import type { LogoutDeleteResponse } from "@/types/api";

export default defineEventHandler(
  async (event): Promise<LogoutDeleteResponse> => {
    setCookie(event, "jwt", "", {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
    });

    return {
      statusCode: 200,
      statusMessage: "Loged out",
    };
  },
);
