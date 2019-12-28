import React from 'react';
import { Grid, Divider, DialogContentText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import imdb from '../../../../../icons/imdb.png';
import rotten from '../../../../../icons/rotten.png';
import metra from '../../../../../icons/Metacritic.png';

const useStyles = makeStyles(theme => ({
    image: {
		width: '100%',
		maxHeight: '500px',
        borderRadius: '10px'
    },
    scores: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    container: {
        width: '100%'
    },
    contentText: {
        paddingTop: '1em',
        color: 'white'
    },
    actorGenre: {
        color: 'white'
    }
}));

const AboutView = (props) => {
    const { movie, t } = props;
    const classes = useStyles();

    const enPlot = props.movie.omdb[0] ? props.movie.omdb[0].Plot : movie.plot; 

    let rating = {};
    if ( movie.omdb[0] ) {
      for (let i in movie.omdb[0].Ratings) {
        let item = movie.omdb[0].Ratings[i]
        rating[item.Source] = item.Value;
      }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <img src={movie.poster} alt={movie.title} className={classes.image}/>
            </Grid>
            <Grid item xs={12} md={8}>
                <div className={classes.scores}>
                    <div className={classes.scoreItem}><img height={20} src={imdb}></img> <b>{rating["Internet Movie Database"] ? rating["Internet Movie Database"] : "N/A"}</b></div>
                    <div className={classes.scoreItem}><img height={20} src={rotten}></img> <b>{rating["Rotten Tomatoes"] ? rating["Rotten Tomatoes"] : "N/A"}</b></div>
                    <div className={classes.scoreItem}><img height={20} src={metra}></img> <b>{rating["Metacritic"] ? rating["Metacritic"] : "N/A"}</b></div>
                </div>
                <Divider />
                <DialogContentText className={classes.contentText}>{props.lng === 'is' ? movie.plot : enPlot }</DialogContentText>
                <div className={classes.actorGenre}>
                    <div className={classes.actorGenreItem}>{t('movies.actors')} <DialogContentText color="inherit">{ movie.actors_abridged.map(x => x.name).join(', ') }</DialogContentText></div>
                    <div className={classes.actorGenreItem}>{t('movies.genres')} <DialogContentText color="inherit">{ movie.genres.map(x => props.lng === 'is' ? x.Name : x['NameEN	']).join(', ') }</DialogContentText></div>
                </div>
            </Grid>
        </Grid>
    )
}

export default withNamespaces()(AboutView);