import { List, ListItem, ListItemText, Typography } from "@mui/material";
import Head from "next/head";

import { AppPage } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>OnBoardPro Demo</title>
      </Head>
      <AppPage>
        <Typography variant="body1" component="p">
          This demo is a proof-of-concept for integrating AWS Amplify, Next.js,
          NextAuth.js, MUI, Supabase Auth, and an API Gateway. We&apos;re
          targeting the following criteria:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Web hosting that supports HIPAA compliance (Amplify)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Web hosting that provides a good-enough DX (Amplify)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Auth that keeps the user's auth tokens out of any form of browser storage, including in-memory (NextAuth, Supabase)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Auth that we can provide a custom UI for (MUI, NextAuth, Supabase)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="An authentication backend that provides necessary functionality at a reasonable price with an exit strategy (Supabase)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Authentication that can be integrated with an API gateway (Amplify, Supabase)" />
          </ListItem>
        </List>
      </AppPage>
    </>
  );
}
