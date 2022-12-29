import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ReceiveOAuth: React.FC<{ csrfToken: string }> = ({ csrfToken }) => {
  const router = useRouter();

  useEffect(() => {
    const logIn = async () => {
      const hashParams: Record<string, string> = window.location.hash
        .substring(1)
        .split("&")
        .map((v) => v.split("="))
        .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {});

      const response = await fetch(
        `${window.location.origin}/api/auth/callback/credentials-google-oauth`,
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            csrfToken,
            refreshToken: hashParams.refresh_token
          })
        }
      );

      if (response.url.indexOf("error=") === -1) {
        if (router.query.callbackUrl) {
          window.location.href = decodeURIComponent(
            router.query.callbackUrl as string
          );
          return;
        }

        window.location.href = "/";
      }
    };

    logIn();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default ReceiveOAuth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
};
