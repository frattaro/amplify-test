import { css } from "@emotion/react";
import { Box } from "@mui/material";
import * as React from "react";

const AppPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      component="main"
      css={css`
        flex-grow: 1;
      `}
    >
      {children}
    </Box>
  );
};

export default AppPage;
