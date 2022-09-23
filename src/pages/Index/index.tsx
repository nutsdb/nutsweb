import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import * as Setting from '../../Setting';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// @ts-ignore
import VerticalTabs from '/src/comps/Tab';
import Board from '../../comps/Board';
import { FormControlLabel, FormGroup, Switch, Tooltip } from '@mui/material';

const drawerWidth = 240;
const textSize = {
  fontSize: '20px',
};

export const InfoContext = React.createContext(null);
export const ConditionContext = React.createContext({});
export const ThrottleContext = React.createContext(false);
export default class Index extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      ip: localStorage.getItem('ip'),
      port: localStorage.getItem('port'),
      alias: localStorage.getItem('alias'),
      token: localStorage.getItem('token'),
      ds: 'string' as string,
      bucket: '' as string,
      checked: false,
    };
    this.changeDs = this.changeDs.bind(this);
    this.changeBucket = this.changeBucket.bind(this);
  }

  changeDs(e: any, value: string) {
    this.setState({
      ...this.state,
      ds: value,
      bucket: '',
    });
  }

  changeBucket(e: any, bucket: string) {
    this.setState({
      ...this.state,
      bucket: bucket,
    });
  }


  render() {
    if (!Setting.isLoggedIn()) {
      setTimeout(() => window.location.href = '/', 1500);
      return <Alert severity='error' style={{ width: '300px', margin: 'auto' }}
                    onClose={() => window.location.href = '/'}>
        you are not logged in
      </Alert>;
    }
    // @ts-ignore
    const { ip, port, alias, checked } = this.state;
    // @ts-ignore
    const condition = { ds: this.state.ds, bucket: this.state.bucket };

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          sx={{ width: `calc(100% - 600px)`, ml: `600px` }}
        >
          <Toolbar>
            <Typography variant='h4' noWrap component='div'>
              {
                //@ts-ignore
                `NutsDB  \\  ${this.state.ds}  \\  ${this.state.bucket}`}
            </Typography>
            <FormGroup sx={{ ml: 'auto' }}>
              <FormControlLabel control={<Switch checked={
                //@ts-ignore
                this.state.checked} onChange={() => {
                this.setState({ ...this.state, checked: !checked });
              }} color='info' />} label='Throttle' labelPlacement='start' />
            </FormGroup>

            <Tooltip title='Throttle means that NutsWeb will not actively send requests for all key-value pairs'
                     sx={{ maxWidth: 300 }}>
              <HelpOutlineIcon sx={{ mr: 10, ml: 5 }} />
            </Tooltip>

          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: 600,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 600,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='left'
        >
          <Toolbar>
            <Typography variant='h5' noWrap component='div' sx={{ color: 'gray', flex: '80%' }}>
              {ip} : {port}
            </Typography>
            <Typography variant='h5' noWrap component='div' sx={{ color: 'gray' }}>
              {alias}
            </Typography>
          </Toolbar>
          <Divider />
          <Typography variant='h5' noWrap component='div'
                      sx={{ mt: 2, mb: 2, ml: 6, textAlign: 'center', color: 'gray' }}>
            Selecting a data structure
          </Typography>
          <Divider />
          <InfoContext.Provider
            //@ts-ignore
            value={this.state}>
            <ThrottleContext.Provider value={checked}>
              <ConditionContext.Provider value={{ changeDs: this.changeDs, changeBucket: this.changeBucket }}>

                <VerticalTabs />

              </ConditionContext.Provider>
            </ThrottleContext.Provider>
          </InfoContext.Provider>
          <Divider />
        </Drawer>
        <Box
          component='main'
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 10 }}
        >

          <ThrottleContext.Provider value={checked}>
            <Board
              //@ts-ignore
              condition={condition} />
          </ThrottleContext.Provider>

          <Divider />

        </Box>

      </Box>
    );
  }
}
