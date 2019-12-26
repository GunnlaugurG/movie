import React from 'react';
import { Grid, useMediaQuery, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    topPanelWrapper: {
        position: 'relative',
        paddingTop: '56.25% !important',
        width: '80%'
    },
    wrapper: {
        position: 'relative',
        paddingTop: '56.25% !important'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        maxHeight: '500px'
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    selected: {
        backgroundColor: '#ad1457',
        color: 'white'
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </Typography>
    );
}

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const TrailerVideo = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { trailers } = props;
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Grid container spacing={3}>
            {
                trailers ? 
                    <>
                        {
                        !matches ? 
                            <>
                            {trailers.map((trailer, index) => 
                                <Grid item key={trailer.id} className={classes.wrapper} xs={12}>
                                    <iframe className={classes.player}
                                        src={trailer.url} allowFullScreen>
                                    </iframe>
                                </Grid>
                            )}
                            </>
                        : 
                            <>
                                {
                                <div className={classes.root}>
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs example"
                                        className={classes.tabs}>
                                    {trailers.map((trailer, index) => 
                                        <Tab key={'y'+ index} label={trailer.name} {...a11yProps(index)}  classes={{selected: classes.selected}} />    
                                    )}
                                    </Tabs>
                                    {trailers.map((trailer, index) => 
                                        <TabPanel key={'x' +index} value={value} index={index} className={classes.topPanelWrapper}>
                                            <iframe className={classes.player}
                                                src={trailer.url} allowFullScreen>
                                            </iframe>
                                        </TabPanel>
                                    )}
                                </div>
                                }
                            </>
                        }
                    </>
                :
                <Grid item>No trailers</Grid>
            }
        </Grid>
    )
}


export default TrailerVideo;

/**
                         {trailers.map((trailer, index) => 
                            <Grid item key={trailer.id} className={classes.wrapper} xs={12}>
                                <iframe className={classes.player}
                                    src={trailer.url} allowFullScreen>
                                </iframe>
                            </Grid>
                        )}
 */