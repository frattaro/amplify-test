import { css } from "@emotion/react";
import { Google } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField
} from "@mui/material";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { AppPage } from "../../components";

const Login: React.FC<{ csrfToken: string }> = ({ csrfToken }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ error: string }[]>([]);
  const [hasUsernameError, setHasUsernameError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);

  const inputStyle = css`
    flex-grow: 1;
    input:-webkit-autofill {
      color: #fff !important;
      -webkit-text-fill-color: #fff !important;
      -webkit-background-clip: text !important;
      -webkit-box-shadow: none;
      box-shadow: none;
      background-clip: text !important;
    }
  `;

  return (
    <AppPage>
      <Box
        css={css`
          display: flex;
          flex-direction: column;
          padding: 20px;
          max-width: 340px;
          margin: 20px auto;
        `}
      >
        <Card
          css={css`
            margin: 0;
          `}
        >
          <Grid
            container
            direction="column"
            spacing={4}
            css={css`
              padding: 16px 28px;
            `}
          >
            <Grid
              item
              xs={12}
              css={css`
                display: flex;
              `}
            >
              OnboardPro Logo
            </Grid>
            {errors.length > 0 && (
              <Grid
                item
                xs={12}
                css={css`
                  display: flex;
                `}
              >
                <Alert severity="error">
                  {errors.map(({ error }, index) => (
                    <p
                      css={css`
                        margin: 4px 0px;
                      `}
                      key={index}
                    >
                      {error}
                    </p>
                  ))}
                </Alert>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              css={css`
                display: flex;
              `}
            >
              <TextField
                id="login__username"
                label="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);

                  if (hasUsernameError && e.target.value.length > 0) {
                    setHasUsernameError(false);
                    setErrors([]);
                  }
                }}
                variant="outlined"
                css={inputStyle}
                error={hasUsernameError}
                helperText={hasUsernameError ? "Required" : null}
              />
            </Grid>
            <Grid
              item
              xs={12}
              css={css`
                display: flex;
              `}
            >
              <TextField
                type="password"
                id="login__password"
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (hasPasswordError && e.target.value.length > 0) {
                    setHasPasswordError(false);
                    setErrors([]);
                  }
                }}
                variant="outlined"
                css={inputStyle}
                error={hasPasswordError}
                helperText={hasPasswordError ? "Required" : null}
              />
            </Grid>
            <Grid
              item
              xs={12}
              css={css`
                display: flex;
              `}
            >
              <Button
                css={css`
                  width: 100%;
                `}
                onClick={async () => {
                  setErrors([]);
                  setHasUsernameError(false);
                  setHasPasswordError(false);
                  if (username.length === 0) {
                    setErrors([{ error: "Username is required" }]);
                    setHasUsernameError(true);
                    return;
                  }

                  if (password.length === 0) {
                    setErrors([{ error: "Password is required" }]);
                    setHasPasswordError(true);
                    return;
                  }

                  try {
                    const response = await fetch(
                      `${window.location.origin}/api/auth/callback/credentials-supabase-password`,
                      {
                        method: "POST",
                        headers: {
                          "content-type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                          csrfToken,
                          username,
                          password
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
                      return;
                    }

                    setErrors([
                      {
                        error: decodeURIComponent(response.url.split("=")[1])
                      }
                    ]);
                  } catch (error) {
                    setErrors([
                      {
                        error: "Failed to connect"
                      }
                    ]);
                  }
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <Button
                variant="outlined"
                onClick={async () => {
                  const response = await fetch("/api/auth/sb-oauth-send");
                  const url = await response.json();
                  window.location.href = url;
                }}
              >
                <Google
                  css={css`
                    margin-right: 5px;
                  `}
                />
                Sign In With Google
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppPage>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
};
