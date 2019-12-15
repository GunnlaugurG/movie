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

const useStyles = makeStyles({
    card: {
        width: '23%',
        margin: '1%',
        borderRadius: '20px',
        borderTop: '1px solid white'
    },
    subtitle: {
        color: 'grey'
    },
    titleContainer: {
        display: 'inline-block'
    },
    actionArea: {
        height: '100%',
    },
    image: {
        borderRadius: '20px',
        border: '1px solid darkgrey'
    }
});

export default function RecipeReviewCard(props) {
  const { movie, selectEmitter } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => selectEmitter()}>
        <CardMedia
          className={classes.image}
          component="img"
          alt={movie.title}
          image={movie.poster}
          title={movie.title}
        />
        <CardContent>
            <div className={classes.titleContainer}>
                <Typography gutterBottom variant="h5" component="h2">
                    {movie.title}
                </Typography>
                <Typography className={classes.subtitle} gutterBottom variant="body1" component="i">
                    {movie.alternativeTitles}
                </Typography>
            </div>
            <Divider></Divider>
            <Typography variant="body2" color="textSecondary" component="p">
            {movie.plot}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}