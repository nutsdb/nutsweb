import * as React from 'react';
import { Button, ListItem, ListItemButton, ListItemText, TextField, Toolbar } from '@mui/material';
import Divider from '@mui/material/Divider';
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@mui/material/Box';
// @ts-ignore
import AutoSizer from 'react-virtualized-auto-sizer';
import axios from 'axios';
import { ConditionContext, InfoContext } from '../pages/Index';
import { BucketsContext} from './Tab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  ds: string;
}


function RenderRow(props: ListChildComponentProps) {
  //@ts-ignore
  const { changeBucket,...other} = React.useContext(ConditionContext);
  let Buckets=React.useContext(BucketsContext)
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component='div' disablePadding>
      <ListItemButton onClick={(e)=>{changeBucket(e,Buckets[index])}}>
        <ListItemText primary={`${Buckets[index]}`} sx={{ textAlign: 'center' }}  />
      </ListItemButton>
    </ListItem>
  );
}

function VirtualizedList(props: any) {
  let Buckets=React.useContext(BucketsContext)
  return (
    <Box
      sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}
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

  const { children, value, index, ds, ...other } = props;
  // @ts-ignore
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
              <TextField id='outlined-basic' label='Bucket' name='text' variant='outlined' sx={{ width: '70%' }} />
              <Button type='submit' variant='contained' size='large' sx={{ ml: 7, height: 50 }}>
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
