import * as React from 'react';
import { Button, ListItem, ListItemButton, ListItemText, TextField, Toolbar } from '@mui/material';
import Divider from '@mui/material/Divider';
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Box from '@mui/material/Box';
// @ts-ignore
import AutoSizer from 'react-virtualized-auto-sizer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component='div' disablePadding>
      <ListItemButton>
        <ListItemText primary={`Buckets ${index + 1}`} sx={{textAlign:'center'}} />
      </ListItemButton>
    </ListItem>
  );
}


function VirtualizedList() {

  // @ts-ignore
  return (
    <Box
      sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}
    >
      <AutoSizer>
        {({ height: height, width:width  }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={60}
            itemCount={100}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>

    </Box>
  );
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
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
          <Toolbar sx={{ m: 1 }}>
            <TextField id='outlined-basic' label='Bucket' variant='outlined' sx={{ width: '70%' }} />
            <Button variant='contained' size='large' sx={{ ml: 7, height: 50 }}>Filter</Button>
          </Toolbar>
          {/*Ajax查询buckets*/}
          <VirtualizedList />

          <Divider />
        </>
      )}
    </div>
  );
}
