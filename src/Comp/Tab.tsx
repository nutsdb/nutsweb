import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './Buckets';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider', width: 120 }}
      >
        <Tab label='String' {...a11yProps(0)} sx={{ height: 80 }} />
        <Tab label='List' {...a11yProps(1)}   sx={{ height: 80 }} />
        <Tab label='Set' {...a11yProps(2)}    sx={{ height: 80 }} />
        <Tab label='ZSet' {...a11yProps(3)}   sx={{ height: 80 }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        String
      </TabPanel>
      <TabPanel value={value} index={1}>
        List
      </TabPanel>
      <TabPanel value={value} index={2}>
        Set
      </TabPanel>
      <TabPanel value={value} index={3}>
        ZSet
      </TabPanel>
    </Box>
  );
}
