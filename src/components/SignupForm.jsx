import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { signUpService } from "../services/userServiceCalls";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const roles = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

export const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      return;
    }

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = event.target.role.value;

    try {
      signUpService({ username, email, password, role }, (err, response) => {
        if(err) {
          // Need to handle error case.
        }
        else {
          navigate("/login");
        }
      });
    } catch (err) {
      // Handle error
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 60 }}
          animate={animate}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
        >
          <TextField
            fullWidth
            label="User name"
            name="username"
            required
          />
        </Stack>

        <Stack
          spacing={3}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
        >
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            name="email"
            required
          />

          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            required
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon
                      icon={
                        showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

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
            Sign up
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
};
