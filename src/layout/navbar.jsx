import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, styled, Divider} from "@mui/material";
import { useAuth } from "../contextProviders/authentication";

export const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const handleLogout = useCallback(() => {
    setUser(undefined);
    localStorage.removeItem("user");
  }, [setUser]);

  const navigateTo = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  const navBarOptions = useMemo(() => {
    const addProductBtn = user?.role === "admin" ? <StyledButton onClick={() => navigateTo("/admin/add")}>
      Add Product
    </StyledButton>: null;
    return <>
      {addProductBtn}
      <StyledButton onClick={() => navigateTo("/products/view")}>
        View Products
      </StyledButton>
    </>
  }, [navigateTo, user?.role]);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">
          Color Management System
        </StyledTypography>
        {
          user && <>
          {navBarOptions}
          <StyledDivider orientation="vertical" flexItem />
          <Typography>{user.username}</Typography>
            <StyledButton onClick={handleLogout}>
              Logout
            </StyledButton>
          </>
        }
        
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#3f51b5",
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  color: "white",
});

const StyledDivider = styled(Divider)(({ theme }) => ({
  height: "100%",
  backgroundColor: "white", 
  margin: "0 10px",
}));

