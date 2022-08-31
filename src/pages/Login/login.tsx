import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StorageIcon from '@mui/icons-material/Storage';
import Alert, { AlertColor } from '@mui/material/Alert';
import * as LoginBackend from '../../backend/Login';
import * as Setting from '../../Setting';
import { useState } from 'react';

const theme = createTheme();

export default function Connect() {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');
  const [alias, setAlias] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info' as AlertColor);
  const [handleAlertClose, setHandleAlertClose] = useState(() => {
  });

  const validate = function(value: any): boolean {
    if (!value || typeof value !== 'string' || value.length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = function(event: any): void {
    event.preventDefault();
    if (!validate(ip)) {
      showMessage('error', 'ip cannot be empty');
      return;
    } else if (!validate(port)) {
      showMessage('error', 'port cannot be empty');
      return;
    } else if (!validate(account)) {
      showMessage('error', 'account cannot be empty');
      return;
    } else if (!validate(password)) {
      showMessage('error', 'password cannot be empty');
      return;
    }

    Setting.setServerUrl(ip, port);

    LoginBackend.login({
      userName: account,
      password: password,
    }).then(res => {
      if (res.code === 200) {
        localStorage.setItem('token', res.data.token);
        showMessage('success', 'login successful', () => window.location.href = '/index');
      } else {
        showMessage('error', `login failed: ${res.error}`);
      }
    });
  };

  const showMessage = (severity: AlertColor, message: string, callback?: () => void) => {
    if (callback) {
      setHandleAlertClose(callback);
    }
    setAlertSeverity(severity);
    setMessage(message);
  };

  const renderAlert = () => {
    setTimeout(() => {
      if (message && message.length > 0) {
        setMessage('');
      }
    }, 2000);
    return message && message.length > 0 ? <div style={{width: '500px', margin: 'auto'}}>
      <Alert severity={alertSeverity} onClose={() => handleAlertClose}>
        {message}
      </Alert>
    </div>: null;
  };

  return (
    <>
      {renderAlert()}
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
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
            <Typography component='h1' variant='h5'>
              NutsDB
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                sx={{ width: '30ch', marginRight: '2ch' }}
                margin='normal'
                required
                id='ip'
                label='IP'
                name='ip'
                autoFocus
                onChange={e => setIp(e.target.value)}
              />
              <TextField
                sx={{ width: '12ch' }}
                margin='normal'
                required
                id='port'
                label='Port'
                name='port'
                onChange={e => setPort(e.target.value)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='alias'
                label='Alias'
                name='alias'
                autoFocus
                onChange={e => setAlias(e.target.value)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='account'
                label='Account'
                name='account'
                autoFocus
                onChange={e => setAccount(e.target.value)}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={e => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Connect
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
