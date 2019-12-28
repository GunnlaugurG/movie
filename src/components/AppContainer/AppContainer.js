import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box, List } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';
import Upcomming from './Upcomming/Upcomming';
import Movies from './Movies/Movies';
import HeaderMenu from './HeaderMenu/HeaderMenu';

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
        padding: 0,
        margin: 0
    },
    tabsRoot: {
        //position: '-webkit-sticky',
        //position: 'sticky',
        //top: 0,
        //zIndex: 2,
        //boxShadow: 'inset 0 7px 9px -7px rgba(0,0,0,0.7)',
        backgroundColor: '#ad1457',
        color: theme.palette.primary.contrastText
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
    const { t } = props
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const theme = useTheme();

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
                        <HeaderMenu />
                    </List>
                </div>
            </AppBar>
            <Tabs value={value} onChange={handleChange} classes={{indicator: classes.appBar, root: classes.tabsRoot}}
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

export default  withNamespaces()(AppContainer);
