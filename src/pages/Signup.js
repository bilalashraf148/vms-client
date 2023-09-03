import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box } from "@mui/material";
import styled from "@emotion/styled";
import { SignupForm } from "../components/SignupForm";
import { Logo } from "../components/Logo";
import { motion } from "framer-motion";

const easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const Signup = ({ setAuth }) => {
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />

            <StyledTypography>
              Enter your details below.
            </StyledTypography>
          </HeadingStyle>

          <SignupForm setAuth={setAuth} />

          <StyledTermsSection
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
          >
            By registering, I agree to{" "}
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </StyledTermsSection>

          <StyledFooterText
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
          >
            Have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Login
            </Link>
          </StyledFooterText>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  display: "grid",
  height: "100vh",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "auto",
  maxWidth: 480,
  padding: 25,
});

const StyledTypography = styled(Typography)({
  color: "text.secondary", 
  mb: 5,
});

const StyledTermsSection = styled(Typography)({
  color: "text.secondary", 
  mt: 2,
});

const StyledFooterText = styled(Typography)({
 mt: 3,
});