import React, { useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
  Divider,
} from '@mui/material';
import { useAuth } from '../contextProviders/authentication';

export const NavBar = () => {
  const { user, setUser } = useAuth();
  const handleLogout = useCallback(() => {
    setUser(undefined);
    localStorage.removeItem('user');
  }, [setUser]);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6">
          Vehicle Management System
        </StyledTypography>
        {user && (
          <>
            <StyledDivider orientation="vertical" flexItem />
            <Typography>{user.username}</Typography>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#3d6865',
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  color: 'white',
});

const StyledDivider = styled(Divider)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'white',
  margin: '0 10px',
}));
