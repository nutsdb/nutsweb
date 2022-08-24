import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StorageIcon from '@mui/icons-material/Storage';
const theme = createTheme();

export default function Connect()
{
  // @ts-ignore
  const handleSubmit = function(event){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      account: data.get('account'),
      password: data.get('password'),
    });
    window.location.href="/index"
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <StorageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           NutsDB
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <TextField
              sx={{width:"30ch",marginRight:'2ch'}}
              margin="normal"
              required
              id="ip"
              label="IP"
              name="ip"
              autoFocus
            />
            <TextField
              sx={{width:"12ch"}}
              margin="normal"
              required
              id="port"
              label="Port"
              name="port"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="alias"
              label="Alias"
              name="alias"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connect
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}