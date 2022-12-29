import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { getCsrfToken } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csrfToken = await getCsrfToken({ req });
  if (process.env.NEXTAUTH_URL?.startsWith("https")) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  res.setHeader(
    "Content-Security-Policy",
    `default-src 'none'; script-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'self';`
  );
  res.setHeader("X-Frame-Options", "deny");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Referrer-Policy", "no-referrer");

  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Logging In...</title>
</head>
<body>
  <script nonce="${nonce}">
    window.addEventListener("load", () => {
      const hashParams = window.location.hash
        .substring(1)
        .split("&")
        .map((v) => v.split("="))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});

      fetch(
        window.location.origin + "/api/auth/callback/credentials-google-oauth",
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            csrfToken: "${csrfToken}",
            refreshToken: hashParams.refresh_token
          })
        }
      ).then(function () {
        window.location.href = "/";
      });
    });
  </script>
</body>
</html>
`);
}
