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

const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        borderRadius: '20px',
        borderTop: '1px solid white',
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
        borderRadius: '20px',
        border: '1px solid darkgrey'
    },
    content: {
      height: '100%'
    },
    scores: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    scoreItem: {
      display: 'block',
      width: '30%'
    }
}));

function RecipeReviewCard(props) {
  const { movie, selectEmitter, t } = props;
  const enPlot = props.movie.omdb[0] ? props.movie.omdb[0].Plot : movie.plot; 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let rating = {};
  if ( movie.omdb[0] ) {
    for (let i in movie.omdb[0].Ratings) {
      let item = movie.omdb[0].Ratings[i]
      rating[item.Source] = item.Value;
    }
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => selectEmitter()} className={classes.actionArea}>
        <CardMedia
          className={classes.image}
          component="img"
          alt={movie.title}
          image={movie.poster}
          title={movie.title}
        />
        <CardContent className={classes.content}>
            <div className={classes.titleContainer}>
                <Typography gutterBottom variant="h5" component="h2">
                    {movie.title}
                </Typography>
                <Typography className={classes.subtitle} gutterBottom variant="body1" component="i">
                    {movie.alternativeTitles}
                </Typography>
            </div>

            <Divider></Divider>
            <div className={classes.scores}>
              {rating["Internet Movie Database"] ? <div className={classes.scoreItem}><b>IMDB: {rating["Internet Movie Database"]}</b></div> : null}
              {rating["Rotten Tomatoes"] ? <div className={classes.scoreItem}><b>Rotten Tomatoes: {rating["Rotten Tomatoes"]}</b></div> : null}
              {rating["Metacritic"] ? <div className={classes.scoreItem}><b>Metacritic: {rating["Metacritic"]}</b></div> : null}
            </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withNamespaces()(RecipeReviewCard);