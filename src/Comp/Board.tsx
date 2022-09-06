import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Table from './Table';
import { GetAllString, GetRangeValueString, GetValueString } from '../backend/GetStringData';

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
    this.state = {
      data: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Only KV GEtall is allowed
  componentWillReceiveProps(nextProps: { condition: { ds: any; bucket: any; }; }) {
    const { ds, bucket } = nextProps.condition;
    if (ds == 'string') {
      GetAllString(bucket).then(
        res => {
          if (res.data.code === 200) {
            this.setState({ data: res.data.data });
          } else {
            this.setState({ data: {} });
          }
        },
      );
    } else {
      this.setState({ data: {} });
    }
  }

  //@ts-ignore
  handleSubmit = (event) => {
    //@ts-ignore
    const { ds, bucket } = this.props.condition;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      type: data.get('type'),
      key: data.get('key'),
      start: data.get('start'),
      end: data.get('end'),
    };
    // Simple verification, after which interaction can be added
    if (bucket == '') {
      return;
    } else if (form.type == 'single' && form.key == '') {
      return;
    } else if (form.type == 'range' && (form.start == '' || form.end == '')) {
      return;
    }

    switch (ds) {
      case 'string':
        //处理string的请求
        if (form.type == 'single') {
          GetValueString(bucket, form.key as string).then(
            res => {
              if (res.data.code === 200) {
                const result:any = {};
                //@ts-ignore
                result[form.key] = res.data.data;
                this.setState({ data: result });
              }
            },
          );
        } else {
          GetRangeValueString(bucket,form.start as string ,form.end as string).then(
            res => {
              if (res.data.code === 200) {
                this.setState({ data: res.data.data });
              }
            },
          );
        }
        break;
    }


  };


  //@ts-ignore
  render() {
    // @ts-ignore
    return (
      <>
        <Box component='form' onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={10}>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='single'
                name='radio-buttons-group'
              >
                <Grid item xs={4}>
                  <FormControlLabel value='single' control={<Radio />} name='type' label='Single' sx={{ mt: 1 }} />
                  <TextField id='outlined-basic' label='Key' name='key' variant='outlined' />
                </Grid>

                <Grid item xs={8}>
                  <FormControlLabel value='range' control={<Radio />} label='Range' name='type' sx={{ mt: 1, ml: 6 }} />
                  <TextField id='outlined-basic' label='Start' name='start' variant='outlined'
                             sx={{ mr: 4, mb: 2, ml: 2 }}
                  />
                  <TextField id='outlined-basic' label='End' name='end' variant='outlined' />
                </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={2}>
              <Button variant='outlined' size='large' type='submit' sx={{ mt: 1,ml:6 }}>Submit</Button>
            </Grid>
          </Grid>
        </Box>
        <Table
          //@ts-ignore
          data={this.state.data} />

      </>
    );
  }

}
