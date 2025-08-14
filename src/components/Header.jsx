import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ user, setUser, cartCount }) {
  const nav = useNavigate();

  const hasToken = Boolean(localStorage.getItem('access'));

  const logout = () => {
    // Clear user and all tokens
    setUser(null);
    localStorage.removeItem('welearn_user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    nav('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App title / home link */}
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          WeLearn
        </Typography>

        <Box>
          {/* Public link */}
          <Button color="inherit" component={Link} to="/">
            Courses
          </Button>

          {/* Show Login/Register only if no token and no user */}
          {!hasToken && !user && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {/* Show cart for normal users */}
          {hasToken && user && user.role !== 'admin' && (
            <Button color="inherit" component={Link} to="/cart">
              Cart ({cartCount})
            </Button>
          )}

          {/* Show admin link */}
          {hasToken && user?.role === 'admin' && (
            <Button color="inherit" component={Link} to="/admin">
              Admin
            </Button>
          )}

          {/* Logout button */}
          {hasToken && user && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
