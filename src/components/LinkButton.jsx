import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, styled } from "@mui/material";

export const LinkButton = ({ buttonText, color, to }) => {
  return (
    <Card>
      <StyledCardContent>
        <StyledLink to={to}>
          <Button variant="contained" color={color}>
            {buttonText}
          </Button>
        </StyledLink>
      </StyledCardContent>
    </Card>
  );
};

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});
