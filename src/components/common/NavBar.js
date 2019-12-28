import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HouseIcon from '@material-ui/icons/House';
import MovieIcon from '@material-ui/icons/Movie';
import Home from '../AppContainer/Upcomming/Upcomming';
import Movies from '../AppContainer/Movies/Movies'
import {NavLink, Switch, Route} from 'react-router-dom';
import i18n from '../../i18n';
import { withNamespaces } from 'react-i18next';
import { withCookies } from 'react-cookie';
// import IS from ''

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    background: '#424242',
    minHeight: '100vh',
    display: 'flex',
  },
  appBar: {
    background: '#212121',
    color: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    color: 'white',   
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
      
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    color: 'white',
    background: '#303030',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    color: 'white',
    background: '#303030',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  toolbarList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: "2em",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icons: {
    color: "white",
  },
  activeLink: {
    backgroundColor: "red !important",
 },
 languageList: {
   display: 'flex',
   float: 'right',
 }
}));

function MiniDrawer(props) {
  const { t, cookies } = props
  const changeLanguage = (lng) => {
    cookies.set('lang', lng, {
      // set cookies for on year
      maxAge: 31536000,
      sameSite: true
    })
    i18n.changeLanguage(lng);
  }
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbarList}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mr.Movie
          </Typography>
          <List className={classes.languageList}>
            <ListItem><img src="../../../public/locales/icons/iceland.png" alt="is" onClick={() => changeLanguage('is')}/></ListItem>
            <ListItem><img src="../../../public/locales/icons/united-kingdom.png" alt="en" onClick={() => changeLanguage('en')}/></ListItem>
          </List>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} className={classes.icons}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <NavLink exact to="/" activeClassName={classes.activeLink}>
                <ListItem button key="home" className={classes.icons}>
                    <ListItemIcon>{ <HouseIcon className={classes.icons}/> }</ListItemIcon>
                    <ListItemText primary={t('home.title')} />
                </ListItem>
            </NavLink>
            <NavLink exact to="movies" activeClassName={classes.activeLink}>
                <ListItem button key="movies" className={classes.icons}>
                    <ListItemIcon>{ <MovieIcon className={classes.icons}/>}</ListItemIcon>
                    <ListItemText primary={t('movies.title')} />
                </ListItem>
            </NavLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Switch>
                <Route exact path="/" component={ Home }/>
                <Route exact paht="/movies" component={ Movies }/>            
            </Switch>
      </main>
    </div>
  );
}


export default withCookies(withNamespaces()(MiniDrawer));