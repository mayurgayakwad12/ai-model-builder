import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AppBar from './AppBar';
import Logo from '../assets/Aventisia V1.png';
import CustomTable from './Table';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import NavigationTree from './NavigationSideBar';
import navigationType from '../typesConstant';

const drawerWidth = 264;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const NAVIGATION: navigationType[] = [
  {
    kind: 'header',
    title: 'Model Library',
  },
  {
    segment: 'modelLibrary',
    title: 'Model Library',
    icon: <GridViewOutlinedIcon />,
    active: true,
  },
  { segment: 'divider' },
  {
    kind: 'header',
    title: 'Extraction Builder',
  },
  {
    segment: 'lableData',
    title: 'Label Data',
    icon: <GridViewOutlinedIcon />,
  },
  {
    segment: 'model',
    title: 'Model',
    icon: <LayersOutlinedIcon />,
  },
  {
    segment: 'test',
    title: 'Test',
    icon: <AssignmentOutlinedIcon />,
  },
  { segment: 'divider' },
  {
    kind: 'header',
    title: 'Help',
  },
  {
    segment: 'setting',
    title: 'Setting',
    icon: <SettingsOutlinedIcon />,
  },
  {
    segment: 'support',
    title: 'Support',
    icon: <ManageAccountsOutlinedIcon />,
  },
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarStyle position="fixed" open={open} sx={{ backgroundColor: '#FFFFFF' }} elevation={0}>
        <Toolbar disableGutters>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[open ? { display: 'none' } : { padding: 0 }]}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
          <AppBar />
        </Toolbar>
      </AppBarStyle>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            height: '80px',
            padding: '0',
            minHeight: '80px',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}
        >
          <img src={Logo} alt="logo" width="225px" />

          <IconButton sx={{ padding: 0 }} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon fontSize="large" />
            ) : (
              <ChevronRightIcon fontSize="large" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ padding: '12px' }}>
          <NavigationTree navigation={NAVIGATION} />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <CustomTable />
      </Main>
    </Box>
  );
}
