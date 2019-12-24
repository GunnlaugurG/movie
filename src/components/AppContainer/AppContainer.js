import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MiniDrawer from '../common/NavBar';
import { positions } from '@material-ui/system';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Upcomming from './Upcomming/Upcomming';
import Movies from './Movies/Movies';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import { withCookies } from 'react-cookie';
import i18n from '../../i18n';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableViews from 'react-swipeable-views';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#ad1457',
        color: theme.palette.primary.contrastText
    },
    main: {
        backgroundColor: '#424242',
        flexGrow: 1,
        width: '100%',
    }, 
    tab: {
        color: theme.palette.primary.contrastText,
        '&:focus': {
            'outline': 'none !important',
        },
    },
    appBarHeader: {
        backgroundColor: '#880e4f',
        display: 'flex'
    },
    appBarHeaderTitle: {
        alignSelf: 'center',
        flexGrow: 1,
        padding: 10
    },
    appBar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.contrastText
    },
    topPanel: {
        color: 'white'
    },
    languageList: {
        display: 'flex',
    }
}));
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }


const AppContainer = (props) => {
    const { t, cookies } = props
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    const changeLanguage = (lng) => {
      cookies.set('lang', lng, {
        // set cookies for on year
        maxAge: 31536000,
        sameSite: true
      })
      i18n.changeLanguage(lng);
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleSwipe = (event, newValue) => {
        setValue(event)
    }
    return (
        <div className={classes.main}>
            <AppBar position="static" className={classes.root}>
                <div className={classes.appBarHeader}>
                    <Typography className={classes.appBarHeaderTitle}>Mr.Movie</Typography>
                    <List className={classes.languageList}>
                        <ListItem><img src="../../../public/locales/icons/iceland.png" alt="is" onClick={() => changeLanguage('is')}/></ListItem>
                        <ListItem><img src="../../../public/locales/icons/united-kingdom.png" alt="en" onClick={() => changeLanguage('en')}/></ListItem>
                    </List>
                </div>
                <Tabs value={value} onChange={handleChange} classes={{indicator: classes.appBar}}
                    indicatorColor="primary"
                    variant="fullWidth"
                    centered
                    textColor="inherit"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                    <Tab label={ t('movies.title')} classes={{root: classes.tab}}/>
                    <Tab label={ t('home.title')} classes={{root: classes.tab}}/>
                </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleSwipe}>
                <TabPanel value={value} index={0} className={classes.topPanel} dir={theme.direction}>
                    <h1>{ t('movies.title') }</h1>
                    <Upcomming />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.topPanel} dir={theme.direction}>
                    <h1>{ t('home.title') }</h1>
                    <Movies />
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

export default  withCookies(withNamespaces()(AppContainer));
