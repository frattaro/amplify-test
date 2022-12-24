import { css } from "@emotion/react";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

const OnboardProAppBar: React.FC<Props> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar color="inherit" position="fixed">
        <Toolbar variant="dense">
          <Button
            onClick={() => {
              session ? signOut() : signIn();
            }}
          >
            {session ? `Sign Out` : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        css={css`
          flex-grow: 1;
          padding: 0;
        `}
      >
        {children}
      </Box>
    </Box>
  );
};

export default OnboardProAppBar;
