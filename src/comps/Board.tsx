import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  SnackbarContent,
  TextField,
  Typography,
} from '@mui/material';
import Table from './Table';
import { GetAllString, GetRangeValueString, GetValueString } from '../backend/GetStringData';
import {
  GetRangeListValue,
  GetRangeSetValue,
  GetRangeZSetByRank,
  GetRangeZSetByScore,
  GetSingleZSetValue,
  PackListData,
  PackSetData,
  PackZSetData,
  PackZSetDataList,
} from '../backend/GetDsData';

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
      open: false as boolean,
      vertical: 'top',
      horizontal: 'center',
      msg: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showMsg = this.showMsg.bind(this);
  }

  handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

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

  showMsg = (message: string) => {
    this.setState({ ...this.state, msg: message, open: true });
  };

  //@ts-ignore
  handleSubmit = (event) => {
    //@ts-ignore
    const { ds, bucket } = this.props.condition;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      type: data.get('type') as string,
      key: data.get('key') as string,
      start: data.get('start'),
      end: data.get('end'),
      rankType: data.get('rankType'),
    };

    if (bucket == '') {
      return;
    } else if (form.type == 'single' && form.key == '' && ds == 'string') {
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
                const result: any = {};
                //@ts-ignore
                result[form.key] = res.data.data;
                this.setState({ data: result });
              } else {
                this.showMsg(res.data.error as string);
              }
            },
          );
        } else {
          GetRangeValueString(bucket, form.start as string, form.end as string).then(
            res => {
              if (res.data.code === 200) {
                this.setState({ data: res.data.data });
              } else {
                this.showMsg(res.data.error as string);
              }
            },
          );
        }
        break;
      case 'list':
        //简单判断，如果为空则默认全部，不为空则判断是否是数字
        if (form.start == '' && form.end == '') {
          // @ts-ignore
          form.start = 0;
          // @ts-ignore
          form.end = -1;
        }
        // @ts-ignore
        if (isNaN(form.start) || isNaN(form.end)) {
          return;
        }
        GetRangeListValue(bucket, form.key, form.start, form.end).then(
          res => {
            if (res.data.code === 200) {
              let da = PackListData(res.data.data);
              console.log(da);
              this.setState({ data: da });
            } else {
              this.showMsg(res.data.error as string);
            }
          },
        );
        break;
      case 'set':
        GetRangeSetValue(bucket, form.key, form.start as string).then(
          res => {
            if (res.data.code === 200) {
              let da = PackSetData(res.data.data);
              this.setState({ data: da });
            } else {
              this.showMsg(res.data.error as string);
            }
          });
        break;
      case 'zset':
        switch (form.rankType) {
          case 'single':
            GetSingleZSetValue(bucket, form.key).then(
              res => {
                if (res.data.code === 200) {
                  let da = PackZSetData(res.data.data.node);
                  this.setState({ data: da });
                } else {
                  this.showMsg(res.data.error as string);
                }
              },
            );
            break;
          case 'rank':
            GetRangeZSetByRank(bucket, form.key, form.start as string, form.end as string).then(
              res => {
                if (res.data.code === 200) {
                  let da = PackZSetDataList(res.data.data.nodes);
                  this.setState({ data: da });
                } else {
                  this.showMsg(res.data.error as string);
                }
              },
            );
            break;
          case 'score':
            GetRangeZSetByScore(bucket, form.key, form.start as string, form.end as string).then(
              res => {
                if (res.data.code === 200) {
                  let da = PackZSetDataList(res.data.data.nodes);
                  this.setState({ data: da });
                } else {
                  this.showMsg(res.data.error as string);
                }
              },
            );
            break;
        }
        break;
    }
  };


  //@ts-ignore
  render() {
    // @ts-ignore
    const flag = this.props.condition.ds != 'string';
    // @ts-ignore
    const isSet = this.props.condition.ds == 'set';
    // @ts-ignore
    const isZSet = this.props.condition.ds == 'zset';
    const hidden = flag ? 'hidden' : 'visible';
    const ml = flag ? 6 : 6;
    const mr = flag ? 4 : 4;
    const display = flag ? 'none' : 'inlineblock';
    const vertical = 'top';
    const horizontal = 'center';

    return (
      <>
        <Snackbar
          //@ts-ignore
          open={this.state.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={this.handleClose}
        >
          <SnackbarContent style={{
            backgroundColor: 'red',
          }}
            //@ts-ignore
                           message={this.state.msg}
          />
        </Snackbar>

        <Box component='form' onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={9.5}>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='single'
                name='radio-buttons-group'
              >
                <Grid item xs>
                  {flag && !isZSet && <Typography variant='h5' noWrap component='div'
                                                  sx={{
                                                    mr: 6,
                                                    pt: 2,
                                                    textAlign: 'center',
                                                    color: 'gray',
                                                    display: 'inline-block',
                                                  }}>
                    Key
                  </Typography>}

                  <FormControlLabel value='single' control={<Radio />} name='type' label='Single'
                                    sx={{ mt: 1, display: display, color: 'gray' }} />

                  <FormControlLabel value='single' control={<Radio />} name='rankType' label='Single'
                                    sx={{ mt: 1, display: !isZSet ? 'none' : 'inline-block', color: 'gray' }} />

                  <TextField id='outlined-basic' label='Key' name='key' variant='outlined' />

                </Grid>
                <Grid item xs={8}>

                  <FormControlLabel value='score' control={<Radio />} label='ByScore' name='rankType'
                                    sx={{ mt: 1, display: !isZSet ? 'none' : 'inline-block', color: 'gray' }} />

                  <FormControlLabel value='rank' control={<Radio />} label='ByRank' name='rankType'
                                    sx={{ mt: 1, display: !isZSet ? 'none' : 'inline-block', color: 'gray' }} />

                  {flag && !isZSet && <Typography variant='h5' noWrap component='div'
                                                  sx={{
                                                    ml: 3,
                                                    mr: 4,
                                                    pt: 2,
                                                    textAlign: 'center',
                                                    color: 'gray',
                                                    display: 'inline-block',
                                                  }}>
                    {isSet ? 'KeyWord' : 'Index'}
                  </Typography>}

                  <FormControlLabel value='range' control={<Radio />} label='Range' name='type'
                                    sx={{ mt: 1, ml: ml, display: display, color: 'gray' }} />

                  <TextField id='outlined-basic' label={isSet ? 'KeyWord' : 'Start'} name='start' variant='outlined'
                             sx={{ mr: mr, mb: 2, width:  0.3 ,display: 'inline-block', }}
                  />

                  <TextField id='outlined-basic' label={isSet ? 'KeyWord' : 'End'}
                             name='end' variant='outlined'
                             sx={{ display: isSet ? 'none' : 'inline-block', width: 0.3 }} />
                </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs>
              <Button variant='outlined' size='large' type='submit' sx={{ mt: 1, ml: 6 }}>Submit</Button>
            </Grid>
          </Grid>
        </Box>
        <Table
          //@ts-ignore
          data={this.state.data} condition={this.props.condition} />
      </>
    );
  }

}
