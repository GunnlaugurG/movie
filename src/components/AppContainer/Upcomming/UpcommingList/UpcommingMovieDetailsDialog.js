import React from 'react';
import { withNamespaces } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Dialog, 
		DialogContent,  DialogTitle,
		Tabs, Tab, Typography, Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import AboutView from './AboutView/AboutView';
import TrailerVideo from '../../../common/TrailerVideo/TrailerVideo';
import { useMediaQuery  } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    dialogStyle: {
        maxHeight: '900px',
        borderRadius: '40px !important',
    },
    cotent: {
        display: 'flex !important',
		width: '100%',
		padding: 0
    },
    contentLeft: {
		width: '100%'
    },
    image: {
		width: '100%',
		maxHeight: '500px',
        borderRadius: '20px'
    }, 
    actorGenre: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    actorGenreItem: {
        width: '50%'
    },
    radius: {
      borderRadius: '20px'
	},
	tab: {
		width: '100%',
        '&:focus': {
            'outline': 'none !important',
        },
	},
	
	appBar: {
		color: theme.palette.primary.contrastText,
		backgroundColor: '#880e4f'
	},
	box: {
		padding: '1em'
	}
}));

function TabPanel(props) {
	const classes = useStyles();
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
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
	console.log(useMediaQuery)

  const handleClose = () => {
    setOpen(false);
    closeEmitter();
  };
  console.log(movie.trailers[0].results);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Dialog className={classes.dialogStyle}
                    fullWidth={true}
                    maxWidth="lg"
                    classes={{paperFullWidth: classes.radius}}
                    scroll="paper"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title">
        <DialogTitle id={movie.id} align="center">
            <>{movie.title}</> 
        </DialogTitle>
        <Tabs value={value} onChange={handleChange} classes={{indicator: classes.appBar}}
		indicatorColor="primary"
		variant="fullWidth"
		textColor="inherit"
		scrollButtons="auto"
		aria-label="scrollable auto tabs example">
            <Tab label={ t('movies.title')} classes={{root: classes.tab}}/>
            <Tab label={ t('home.title')} classes={{root: classes.tab}}/>
		</Tabs>
		<DialogContent className={classes.cotent}>
			<SwipeableViews className={classes.contentLeft} axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChange}>
				<TabPanel value={value} index={0} className={classes.topPanel} dir={theme.direction}>
					<AboutView movie={movie} />
				</TabPanel>
				<TabPanel value={value} index={1} className={classes.topPanel} dir={theme.direction}>
					<TrailerVideo trailers={movie.trailers[0].results}/>		
				</TabPanel>
			</SwipeableViews>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default withNamespaces()(MaxWidthDialog)


/**
 *             
 *          <div>
                <img src={movie.poster} alt={movie.title} className={classes.image}/>
            </div>
            <div className={classes.contentLeft}>
                <div className={classes.scores}>
                {rating["Internet Movie Database"] ? <div className={classes.scoreItem}><img height={20} src="../../../../../../public/locales/icons/imdb.png"></img> <b>{rating["Internet Movie Database"]}</b></div> : null}
                    {rating["Rotten Tomatoes"] ? <div className={classes.scoreItem}><img height={20} src="../../../../../../public/locales/icons/rotten.png"></img> <b>{rating["Rotten Tomatoes"]}</b></div> : null}
                    {rating["Metacritic"] ? <div className={classes.scoreItem}><img height={20} src="../../../../../../public/locales/icons/Metacritic.png"></img> <b>{rating["Metacritic"]}</b></div> : null}
                </div>
                <Divider></Divider>
                <DialogContentText>{props.lng === 'is' ? movie.plot : enPlot }</DialogContentText>
                <div className={classes.actorGenre}>
                    <div className={classes.actorGenreItem}>{t('movies.actors')} <DialogContentText >{ movie.actors_abridged.map(x => x.name).join(', ') }</DialogContentText></div>
                    <div className={classes.actorGenreItem}>{t('movies.genres')} <DialogContentText >{ movie.genres.map(x => props.lng === 'is' ? x.Name : x['NameEN	']).join(', ') }</DialogContentText></div>
                </div>
                <Divider></Divider>

            </div>
 */