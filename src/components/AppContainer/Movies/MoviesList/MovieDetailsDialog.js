import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Dialog, Divider, Paper, ButtonDialog,
        DialogActions, DialogContent, DialogContentText, 
        Button, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import SwipeableViews from 'react-swipeable-views';

import Tickets from './Tickets/Tickets'
import AboutView from '../../../common/AboutView/AboutView';
import TrailerVideo from '../../../common/TrailerVideo/TrailerVideo'
import DialogTitle from '../../../common/DialogTitle';


const MakeStyle = movie => {
  const useStyles = makeStyles(theme => {
    return {
      dialogStyle: {
          maxHeight: '900px',
          borderRadius: '10px !important'
      },
      content: {
        display: 'flex !important',
        width: '100%',
        padding: 0,
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        color: 'white !important'
      },
      contentLeft: {
        width: '100%'
      },
      image: {
          marginRight: '2em !important',
          minHeight: '400px',
          width: "300px",
          borderRadius: '10px'
      }, 
      actorGenre: {
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%'
      },
      actorGenreItem: {
          width: '50%'
      },
      showtime: {
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap'
      },
      scores: {
          display: 'flex',
          justifyContent: 'space-between'
      },
      radius: {
          borderRadius: '10px',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${movie ? movie.poster : null})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '1px solid',
          color: 'white'
      },
      paper: {
          marginBottom: '1em'
      },
      tab: {
      width: '100%',
          '&:focus': {
              'outline': 'none !important',
          },
      },
      tabs: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
      appBar: {
          color: theme.palette.primary.contrastText,
          backgroundColor: '#880e4f',
      },
      box: {
          padding: '1em'
      },
      selected: {
          backgroundColor: '#ad1457',
          color: 'white',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
      }}
  });
  return useStyles();
}


function TabPanel(props) {
	const classes = MakeStyle();
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
        {value === index && <Box classes={{root: classes.box}} p={3}>{children}</Box>}
      </Typography>
    );
}

function MaxWidthDialog(props) {
  const { movie, closeEmitter, t } = props;
  const enPlot = props.movie.omdb[0] ? props.movie.omdb[0].Plot : movie.plot; 
  const classes = MakeStyle(movie);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
    closeEmitter();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSwipe = (event, newValue) => {
    setValue(event);
  }
  console.log(movie);
  return (
    <React.Fragment>
      <Dialog className={classes.dialogStyle}
                    classes={{paperFullWidth: classes.radius}}
                    fullWidth={true}
                    maxWidth="lg"
                    scroll="paper"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title">
        <DialogTitle id={movie.id} onClose={handleClose}>
            <>{movie.title}</>
        </DialogTitle>
        <Tabs value={value} onChange={handleChange} classes={{indicator: classes.appBar, root: classes.tabs}}
              indicatorColor="primary"
              variant="fullWidth"
              textColor="inherit"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example">
            <Tab label={ t('movies.about')} classes={{root: classes.tab, selected: classes.selected}}/>
            <Tab label={ t('movies.tickets')} classes={{root: classes.tab, selected: classes.selected}}/>
            <Tab label={ t('movies.trailers')} classes={{root: classes.tab, selected: classes.selected}}/>
        </Tabs>
        <DialogContent className={classes.content} >
        <SwipeableViews className={classes.contentLeft} axis="x" index={value} onChangeIndex={handleSwipe} >
            <TabPanel value={value} index={0} className={classes.topPanel} dir={theme.direction}>
                <AboutView movie={movie} />
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.topPanel} dir="{theme.direction}">
                <Tickets showtimes={movie.showtimes}/>
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.topPanel} dir="{theme.direction}">
                <TrailerVideo trailers={movie.trailers.length > 0 ? movie.trailers[0].results : null}/>		
            </TabPanel>
        </SwipeableViews>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default withNamespaces()(MaxWidthDialog)
