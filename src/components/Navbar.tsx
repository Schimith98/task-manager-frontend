import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { privatePages, publicPages } from '../constants/pages';


const Navbar: React.FC = () => {
  const { user, logout } = useUser();

  const location = useLocation();

  const handleActive = (pathname: string) => {
    const currentRoute = location.pathname
    if (pathname === currentRoute) {
      return true
    }
    return false
  }

  return (
    <AppBar position="relative" sx={{ mb: '8px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gerenciador de Tarefas
        </Typography>
        <Stack sx={{ flexGrow: 1 }} direction={'row'} spacing={2} flexWrap={'wrap'} useFlexGap>
          {user && privatePages.map(page =>
            <Button
              color="inherit"
              variant={handleActive(page.pathname) ? 'outlined' : 'text'}
              component={Link}
              startIcon={page.icon}
              to={page.pathname}
            >
              {page.title}
            </Button>)
          }
        </Stack>
        <Stack direction={'row'} spacing={2}>
          {!user && publicPages.map(page =>
            <Button
              color="inherit"
              variant={handleActive(page.pathname) ? 'outlined' : 'text'}
              component={Link}
              to={page.pathname}>
              {page.title}
            </Button>

          )}
        </Stack>
        {
          user && <Button color="inherit" onClick={logout}>
            Sair
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;