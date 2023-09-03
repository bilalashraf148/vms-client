import React from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { LinkButton } from "../../components/LinkButton";


export const AdminDashboard = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <StyledGridWrapper container spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <LinkButton buttonText={"Add new Product"} color={"primary"} to={"/admin/add"}/>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <LinkButton buttonText={"View existing Products"} color={"primary"} to={"/products/view"}/>
        </Grid>
      </StyledGridWrapper>
    </StyledContainer>
  );
}

const StyledGridWrapper = styled(Grid)({
  justifyContent: "center",
});

const StyledContainer = styled(Box)({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh",
});
