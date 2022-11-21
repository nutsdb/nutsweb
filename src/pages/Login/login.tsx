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
import axios from 'axios';
import { Alert, AlertColor, LinearProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Setting from '../../Setting';

const theme = createTheme();

export default function Connect() {

  const [show, changeShow] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [message, setMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('info' as AlertColor);
  const [handleAlertClose, setHandleAlertClose] = React.useState(() => {
  });

  const history = useNavigate();
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // @ts-ignore
  const handleSubmit = function(event) {
    event.preventDefault();

    const validate = function(value: any): boolean {
      if (!value || typeof value !== 'string' || value.length === 0) {
        return false;
      }
      return true;
    };
    const data = new FormData(event.currentTarget);
    const form = {
      account: data.get('account'),
      password: data.get('password'),
      alias: data.get('alias'),
      ip: data.get('ip'),
      port: data.get('port'),
    };

    const showMessage = (severity: AlertColor, message: string, callback?: () => void) => {
      if (callback) {
        setHandleAlertClose(callback);
      }
      setAlertSeverity(severity);
      setMessage(message);
    };

    if (!validate(form.ip)) {
      showMessage('error', 'ip cannot be empty');
      return;
    } else if (!validate(form.port)) {
      showMessage('error', 'port cannot be empty');
      return;
    } else if (!validate(form.account)) {
      showMessage('error', 'account cannot be empty');
      return;
    } else if (!validate(form.password)) {
      showMessage('error', 'password cannot be empty');
      return;
    }

    changeShow(true);

    Setting.setServerUrl(form.ip as string, form.port as string);

    axios
      .post(Setting.ServerUrl+"/login", {
        userName: form.account,
        password: form.password,
      })
      .then((response) => {
        changeShow(false);
        localStorage.clear()
        if (response.data.code == 200) {
          //login success
          localStorage.setItem('token', response.data.data);
          localStorage.setItem('ip',form.ip as string);
          localStorage.setItem('alias',form.alias as string);
          localStorage.setItem('port',form.port as string);
          showMessage('success', 'login successful', () => {
                  history("/index")
          });
          // @ts-ignore
        } else {
          showMessage('error', `login failed: ${response.data.error}`);
          changeShow(false);
        }
      });
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

  // @ts-ignore
  // @ts-ignore
  return (
    <>
    {renderAlert()}
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        {show && <LinearProgress />}
      </Box>
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
            />
            <TextField
              sx={{ width: '12ch' }}
              margin='normal'
              required
              id='port'
              label='Port'
              name='port'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='alias'
              label='Alias'
              name='alias'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='account'
              label='Account'
              name='account'
              autoFocus
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

      <Snackbar
        anchorOrigin={{
          vertical: state.vertical as 'top' | 'bottom',
          horizontal: state.horizontal as 'left' | 'center' | 'right',
        }}
        open={state.open}
        onClose={handleClose}
        message='Login Fail'
        //@ts-ignore
        ContentProps={{
          sx: {
            background: "red"
          }
        }}
        key={state.vertical + state.horizontal}
      />
    </ThemeProvider>
    </>
  );
}
