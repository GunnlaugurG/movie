import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withNamespaces } from 'react-i18next';
import { Divider, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialogStyle: {
        maxHeight: '900px',
        borderRadius: '20px !important'
    },
    cotent: {
        display: 'flex !important',
    },
    image: {
        marginRight: '2em !important',
        minHeight: '400px',
        width: "300px",
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
        borderRadius: '20px'
    },
    paper: {
        marginBottom: '1em'
    }
}));

function MaxWidthDialog(props) {
  const { movie, closeEmitter, t } = props;
  const enPlot = props.movie.omdb[0] ? props.movie.omdb[0].Plot : movie.plot; 
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  let rating = {};
  if ( movie.omdb[0] ) {
    for (let i in movie.omdb[0].Ratings) {
      let item = movie.omdb[0].Ratings[i]
      rating[item.Source] = item.Value;
    }
  }

  const handleClose = () => {
    setOpen(false);
    closeEmitter();
  };


  const openNewTap = link => {
    window.open(link, "_blank")
  }

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
        <DialogTitle id={movie.id} align="center">
            <>{movie.title}</> 
            <p>{movie.alternativeTitles} ({movie.year})</p>
        </DialogTitle>
        <DialogContent className={classes.cotent}>
            <div>
                <img src={movie.poster} alt={movie.title} className={classes.image}/>
            </div>
            <div>
                <div className={classes.scores}>
                    
                    <div className={classes.scoreItem}><img height={20} src="../../../../../public/locales/icons/imdb.png"></img> <b>{rating["Internet Movie Database"] ? rating["Internet Movie Database"] : 'N/A'}</b></div>
                    <div className={classes.scoreItem}><img height={20} src="../../../../../public/locales/icons/rotten.png"></img> <b>{rating["Rotten Tomatoes"] ? rating["Rotten Tomatoes"] : 'N/A'}</b></div>
                    <div className={classes.scoreItem}><img height={20} src="../../../../../public/locales/icons/Metacritic.png"></img> <b>{rating["Metacritic"] ? rating["Metacritic"] : 'N/A'}</b></div>
                </div>
                <Divider></Divider>
                <DialogContentText>{props.lng === 'is' ? movie.plot : enPlot }</DialogContentText>
                <div className={classes.actorGenre}>
                    <div className={classes.actorGenreItem}>{t('movies.actors')} <DialogContentText >{ movie.actors_abridged.map(x => x.name).join(', ') }</DialogContentText></div>
                    <div className={classes.actorGenreItem}>{t('movies.genres')} <DialogContentText >{ movie.genres.map(x => props.lng === 'is' ? x.Name : x['NameEN	']).join(', ') }</DialogContentText></div>
                </div>
                <Divider></Divider>
                <div>
                    {movie.showtimes.map(show => {
                        return (
                            <Paper className={classes.paper}>
                                <div className={classes.showtime} key={show.cinema.id}>
                                    <p>{show.cinema.name}</p>
                                    {show.schedule.map((schedule, index) => {
                                        return (
                                            <Button key={schedule.purchase_url} onClick={() => openNewTap(schedule.purchase_url)} color="primary">{schedule.time}</Button>
                                        )
                                    })}
                                </div>
                            </Paper>
                        )
                    })}
                </div>
            </div>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withNamespaces()(MaxWidthDialog)