import * as React from 'react';
import { Button, ListItem, ListItemButton, ListItemText, TextField, Toolbar } from '@mui/material';
import Divider from '@mui/material/Divider';
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@mui/material/Box';
// @ts-ignore
import AutoSizer from 'react-virtualized-auto-sizer';
import { ConditionContext } from '../pages/Index';
import { BucketsContext, IdxContext } from './Tab';
import { preventOverflow } from '@popperjs/core';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  ds: string;
}

function RenderRow(props: ListChildComponentProps) {
  //@ts-ignore
  const { changeBucket, ...other } = React.useContext(ConditionContext);
  // @ts-ignore
  const { idx, setIdx } = React.useContext(IdxContext);
  let Buckets = React.useContext(BucketsContext);
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component='div' disablePadding>
      <ListItemButton onClick={(e) => {
        changeBucket(e, Buckets[index]);
        setIdx(index);
      }}>
        <ListItemText primary={`${Buckets[index]}`}
                      sx={{ textAlign: 'center', color: index == idx ? '#0047AB' : 'black' }} />
      </ListItemButton>
    </ListItem>
  );
}

function VirtualizedList(props: any) {

  let Buckets = React.useContext(BucketsContext);
  const [Index, setIndex] = React.useState(-1);

  return (
    <Box
      sx={{ width: '100%', height: '90%', bgcolor: 'background.paper' }}
    >
      <AutoSizer>
        { //@ts-ignore
          ({ height: height, width: width },
          ) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={60}
              itemCount={Buckets.length}
              overscanCount={5}
            >
              {RenderRow}
            </FixedSizeList>
          )}
      </AutoSizer>
    </Box>
  );
}

//@ts-ignore
export default function TabPanel(props: TabPanelProps) {
  // @ts-ignore
  const { idx, setIdx, changeReg } = React.useContext(IdxContext);
  const { children, value, index, ds, ...other } = props;
  const [text, setText] = React.useState('');
  // @ts-ignore
  const handleTextInputChange = event => {
    setText(event.target.value);
  };
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <>
          <Box component='form'>
            <Toolbar sx={{ m: 1 }}>
              <TextField id='outlined-basic'  onChange= {handleTextInputChange} label='Bucket' name='text' variant='outlined' sx={{ width: '70%' }} />
              <Button onClick={(event) => {
                  event.preventDefault()
                changeReg(`${text}`)
              }} type='submit' variant='contained' size='large' sx={{ ml: 7, height: 50 }}>
                Filter</Button>
            </Toolbar>
          </Box>
          <VirtualizedList />
          <Divider />
        </>
      )}
    </div>
  );
}
