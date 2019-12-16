import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './commonStyles.less'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    position: 'fixed',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress  color="secondary" size={200}/>
    </div>
  );
}