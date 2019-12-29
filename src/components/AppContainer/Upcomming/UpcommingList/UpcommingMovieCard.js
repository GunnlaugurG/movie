import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withNamespaces } from 'react-i18next';
import imdb from '../../../../icons/imdb.png';
import rotten from '../../../../icons/rotten.png';
import metra from '../../../../icons/Metacritic.png';

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
  },
  release: {
    marginTop: '-30px',
    position: 'absolute',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: '10px',
    padding: '0 10px',
  }
}));
function RecipeReviewCard(props) {
  const { movie, selectEmitter, t } = props;
  const classes = useStyles();
  const splitDate = movie['release-dateIS'].split('-');
  let rating = {};
  if ( movie.omdb[0] ) {
    for (let i in movie.omdb[0].Ratings) {
      let item = movie.omdb[0].Ratings[i]
      rating[item.Source] = item.Value;
    }
  }
  const month = {
    '01': 'january',
    '02': 'february',
    '03': 'march',
    '04': 'april',
    '05': 'may',
    '06': 'june',
    '07': 'july',
    '08': 'agust',
    '09': 'september',
    '10': 'october',
    '11': 'november',
    '12': 'december',
  }
  
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => selectEmitter()} className={classes.actionArea}>
        <div className={classes.scores}>
          {rating["Internet Movie Database"] ? <div className={classes.scoreItem}><b style={{'padding': '5px'}}><img height={20} src={imdb}></img> {rating["Internet Movie Database"].split('/')[0].replace('.', '')}</b></div> : null}
          {rating["Rotten Tomatoes"] ? <div className={classes.scoreItem}><b style={{'padding': '5px'}}><img height={20} src={rotten}></img> {rating["Rotten Tomatoes"] ? rating["Rotten Tomatoes"].split('%')[0] : 'N/A'}</b></div> : null}
          {rating["Metacritic"] ? <div className={classes.scoreItem}><b style={{'padding': '5px'}}><img height={20} src={metra}></img> {rating["Metacritic"] ? rating["Metacritic"].split('/')[0] : 'N/A'}</b></div>: null}
        </div>
        <div>
          <CardMedia
            className={classes.image}
            component="img"
            alt={movie.title}
            image={movie.poster}
            title={movie.title}/>
            <Typography className={classes.release} component="p" color="inherit">
              {splitDate[2]}.{t('month.' + month[movie['release-dateIS'].split('-')[1]])}
            </Typography>
        </div>
        <CardContent classes={{ root: classes.content}}>
            <Typography component="h6" variant="caption" style={{ 'paddingLeft': '10px', 'paddingTop': '5px', 'fontWeight': '800'}}>
                {movie.title}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withNamespaces()(RecipeReviewCard);