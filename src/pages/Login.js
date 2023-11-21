import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Container, Typography, Link, Box, styled } from "@mui/material";
import { LoginForm } from "../components/LoginForm";
import { Logo } from "../components/Logo";
import { motion } from "framer-motion";
import { useAuth } from "../contextProviders/authentication";

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
    y: 60,
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

export const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate("/admin/vehicles");
    }
  }, [navigate, user]);
  

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />
            <StyledTypography>
              Login to your account
            </StyledTypography>
          </HeadingStyle>

          <LoginForm />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
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

const ContentStyle = styled("div")({
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