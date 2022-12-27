import { css } from "@emotion/react";
import { Box } from "@mui/material";
import * as React from "react";

import OnboardProAppBar from "./OnboardProAppBar";

const AppPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <OnboardProAppBar />
      <Box
        component="main"
        css={css`
          flex-grow: 1;
          margin-top: 80px;
          padding: 0 24px;
        `}
      >
        {children}
      </Box>
    </>
  );
};

export default AppPage;
