import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAuth } from "../contextProviders/authentication";
import { signInService } from "../services/userServiceCalls";
import { setUserInLocalStorage } from "../utils";

const easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

export const LoginForm = () => {
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      signInService({
        username,
        password,
      }, (err, response) => {
        if(err) {
          // Need to handle error case.
        }
        else {
          setUserInLocalStorage(response);
          setUser(response);
        }
      });
    } 
    catch (err) {
      // Handle error
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Box
        component={motion.div}
        animate={{
          transition: {
            staggerChildren: 0.55,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
        >
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            name="username"
            required
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Icon icon="eva:eye-fill" />
                    ) : (
                      <Icon icon="eva:eye-off-fill" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={animate}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Login
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};
