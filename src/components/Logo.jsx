import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/static/icon_logo.png" alt="logo" />
      </Link>
    </Box>
  );
};
