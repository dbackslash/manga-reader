import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Explore, Favorite, Settings } from '@material-ui/icons';
import { Link } from 'components/ui';
import ThemeSwitch from './ThemeSwitch';

const drawerWidth = 240;

const sidebarMenu = [
  { key: 'discover', text: 'Discover', path: '/', icon: <Explore /> },
  { key: 'favorites', text: 'Favorites', path: '/favorite', icon: <Favorite /> },
  { key: 'settings', text: 'Settings', path: '/settings', icon: <Settings />},
];

export default function Layout({ title, children }: Props) {
  const classes = useStyles();
  const location = useLocation();

  const section = sidebarMenu.find(item => item.path === location.pathname)

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {section ? section.text : title}
          </Typography>

          <div className={classes.grow} />

          <div>
            <ThemeSwitch />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {sidebarMenu.map(item => (
              <Link to={item.path} key={item.key} underline="none" color="textPrimary">
                <ListItem button key={item.key}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
      <main
        className={classes.content}
      >
        <Toolbar />
        {children}
      </main>

    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface Props {
  title: string;
  children: React.ReactNode;
}
