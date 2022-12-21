import { Typography } from "@mui/material";
import Head from "next/head";

import { AppPage } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Team Docs</title>
      </Head>

      <AppPage>
        <Typography variant="h1">Team Docs</Typography>

        <Typography variant="h2">Meet the Team</Typography>

        <Typography variant="h2">Front End</Typography>

        <Typography variant="h2">Back End</Typography>
      </AppPage>
    </>
  );
}
