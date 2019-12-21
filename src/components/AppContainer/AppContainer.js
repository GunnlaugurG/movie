import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MiniDrawer from '../common/NavBar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Home from './Home/Home';
import Movies from './Movies/Movies';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#880e4f',
        color: theme.palette.primary.contrastText
    },
    main: {
        backgroundColor: '#424242',
        flexGrow: 1,
        width: '100%'
    }, 
    tab: {
        color: theme.palette.primary.contrastText,
        '&:focus': {
            'outline': 'none !important',
        },
    },
    appBar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.contrastText
    },
    topPanel: {
        color: 'white'
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


const AppContainer = ({ t }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <div className={classes.main}>
            <AppBar position="static" className={classes.root}>
                <Tabs value={value} onChange={handleChange} classes={{indicator: classes.appBar}}
                    indicatorColor="primary"
                    variant="fullWidth"
                    centered
                    textColor="inherit"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                    <Tab label={ t('home.title')} classes={{root: classes.tab}}/>
                    <Tab label="Item Two" classes={{root: classes.tab}}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.topPanel}>
                <Movies />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Home />
            </TabPanel>
        </div>
    )
}

export default withNamespaces()(AppContainer);
