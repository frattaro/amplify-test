import { css } from "@emotion/react";
import { CheckSharp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import { AppPage } from "../components";

export default function Home() {
  const [sessionInfo, setSessionInfo] = useState(null);
  const session = useSession();

  return (
    <>
      <Head>
        <title>OnBoardPro Demo</title>
      </Head>
      <AppPage>
        {session?.data ? (
          <Card
            css={css`
              margin-bottom: 20px;
            `}
          >
            <CardContent>
              <Button
                onClick={async () => {
                  const response = await fetch("/api/test");
                  const session = await response.json();
                  setSessionInfo(session);
                }}
              >
                Test Backend
              </Button>
              {sessionInfo ? (
                <pre>
                  <code>{JSON.stringify(sessionInfo, null, 2)}</code>
                </pre>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        <Typography variant="body1" component="p">
          This demo is a proof-of-concept for integrating AWS Amplify, Next.js,
          NextAuth.js, MUI, Supabase Auth, and an API Gateway. We&apos;re
          targeting the following criteria:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckSharp />
            </ListItemIcon>
            <ListItemText primary="Web hosting that supports HIPAA compliance (Amplify)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckSharp />
            </ListItemIcon>
            <ListItemText primary="Web hosting that provides a good-enough DX (Amplify)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckSharp />
            </ListItemIcon>
            <ListItemText primary="Auth that keeps the user's auth tokens out of any form of browser storage, including in-memory (NextAuth, Supabase)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckSharp />
            </ListItemIcon>
            <ListItemText primary="Auth that we can provide a custom UI for (MUI, NextAuth, Supabase)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckSharp />
            </ListItemIcon>
            <ListItemText primary="An authentication backend that provides necessary functionality at a reasonable price with an exit strategy (Supabase)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckSharp />
            </ListItemIcon>
            <ListItemText primary="Authentication that can be integrated with an API gateway (Amplify, Supabase)" />
          </ListItem>
        </List>
      </AppPage>
    </>
  );
}
