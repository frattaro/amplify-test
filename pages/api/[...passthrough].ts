// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Session, User } from "@supabase/supabase-js";
import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "./auth/[...nextauth]";

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authOptions2 = { ...authOptions };
  (authOptions2.callbacks || {}).session = async ({ session, token }) => {
    // @ts-ignore
    session.access_token = token.accessToken;
    session.user = token.user as User;

    return session;
  };

  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  const proxy = httpProxy.createProxyServer();
  proxy.on("proxyReq", function (proxyReq) {
    if (session) {
      proxyReq.setHeader("Authorization", `Bearer ${session.access_token}`);
    }
  });

  return new Promise((resolve: (value: void) => void, reject) => {
    proxy.web(
      req,
      res,
      { target: process.env.BACKEND_URL, changeOrigin: true },
      (err: Error) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
}
