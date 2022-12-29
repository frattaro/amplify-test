import type { NextApiRequest, NextApiResponse } from "next";

import { createSupabaseClient } from "../../../api-clients/createSupabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = createSupabaseClient();
  const response = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXTAUTH_URL}/auth/receive-oauth`
    }
  });

  res.json(response.data.url);
}
