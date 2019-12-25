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
      borderRadius: '10px',
      borderTop: '1px solid white',
      '&:hover': {
        'box-shadow': theme.shadows[12]
      }
  },
  subtitle: {
      color: 'grey'
  },
  titleContainer: {
	  width: '100%'
  },
  actionArea: {
      height: '100%'
  },
  image: {
      borderRadius: '10px',
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

  const splitDate = movie['release-dateIS'].split('-');

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
			<b style={{display: 'flex'}}>
				{splitDate[2]}.<p style={{textTransform: 'capitalize'}}>{t('month.' + month[movie['release-dateIS'].split('-')[1]])}</p>
			</b>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withNamespaces()(RecipeReviewCard);