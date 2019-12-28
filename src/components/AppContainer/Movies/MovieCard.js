import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        borderRadius: '10px',
        border: '1px solid white',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        '&:hover': {
          'box-shadow': theme.shadows[12]
        }
    },
    subtitle: {
        color: 'grey'
    },
    titleContainer: {
        display: 'inline-block'
    },
    actionArea: {
        height: '100%'
    },
    image: {
        borderRadius: '10px 10px 0px 0px',
        boxShadow: '1px 7px 7px -5px rgba(255,255,255,0.7)',
    },
    content: {
      height: '100%',
      padding: 0,
      margin: 0
    },
    scores: {
      position: 'absolute',
      padding: '5px 10px',
      width: '100%'
    },
    scoreItem: {
      display: 'block',
      width: 'fit-content',
      backgroundColor: 'rgba(0, 0, 0, .5)',
      borderRadius: '10px'
    }
}));

function RecipeReviewCard(props) {
  const { movie, selectEmitter } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xs'));
  const classes = useStyles();
  let rating = {};
  if ( movie.omdb[0] ) {
    for (let i in movie.omdb[0].Ratings) {
      let item = movie.omdb[0].Ratings[i]
      rating[item.Source] = item.Value;
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => selectEmitter()} className={classes.actionArea}>
        <div className={classes.scores}>
          {rating["Internet Movie Database"] ? <div className={classes.scoreItem}><b style={{'padding': '5px'}}><img height={20} src="../../../public/locales/icons/imdb.png"></img> {rating["Internet Movie Database"].split('/')[0].replace('.', '')}</b></div> : null}
          {rating["Rotten Tomatoes"] ? <div className={classes.scoreItem}><b style={{'padding': '5px'}}><img height={20} src="../../../public/locales/icons/rotten.png"></img> {rating["Rotten Tomatoes"] ? rating["Rotten Tomatoes"].split('%')[0] : 'N/A'}</b></div> : null}
          {rating["Metacritic"] ? <div className={classes.scoreItem}><b style={{'padding': '5px'}}><img height={20} src="../../../public/locales/icons/Metacritic.png"></img> {rating["Metacritic"] ? rating["Metacritic"].split('/')[0] : 'N/A'}</b></div>: null}
        </div>
        <CardMedia
          className={classes.image}
          component="img"
          alt={movie.title}
          image={movie.poster}
          title={movie.title}
        />
        <CardContent classes={{ root: classes.content}}>
            <Typography  component="h6" variant="caption" style={{ 'paddingLeft': '10px', 'paddingTop': '5px', 'fontWeight': '800'}}>
                {movie.title}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withNamespaces()(RecipeReviewCard);
