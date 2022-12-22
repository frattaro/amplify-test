import { Typography } from "@mui/material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";

import { Account, AppPage } from "../components";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      <Head>
        <title>Team Docs</title>
      </Head>
      <AppPage>
        <Typography variant="h1">Team Docs</Typography>

        <div className="container" style={{ padding: "50px 0 100px 0" }}>
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          ) : (
            <Account session={session} />
          )}
        </div>

        <Typography variant="h2">Meet the Team</Typography>

        <Typography variant="h2">Front End</Typography>

        <Typography variant="h2">Back End</Typography>
      </AppPage>
    </>
  );
}
