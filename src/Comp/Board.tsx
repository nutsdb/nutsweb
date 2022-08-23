import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import  Table  from './Table';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default class Board extends React.Component {
  //@ts-ignore
  constructor(props) {
    super(props);
  }

  //@ts-ignore
  render() {
    // @ts-ignore
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <RadioGroup
              row
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='single'
              name='radio-buttons-group'
            >
              <Grid item xs={4}>
                <FormControlLabel value='single' control={<Radio />} label='Single' sx={{ mt: 1 }} />
                <TextField id='outlined-basic' label='Key' variant='outlined' />
              </Grid>
              <Grid item xs={8}>
                <FormControlLabel value='range' control={<Radio />} label='Range' sx={{ mt: 1, ml: 6 }} />
                <TextField id='outlined-basic' label='Start' variant='outlined' sx={{ mr: 4, mb: 2, ml: 2 }}
                           />
                <TextField id='outlined-basic' label='End' variant='outlined'  />
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={2}>
            <Button variant='outlined' size='large' sx={{ mt: 1 }}>Submit</Button>
          </Grid>
        </Grid>
        <Table />
      </>
    );
  }

}