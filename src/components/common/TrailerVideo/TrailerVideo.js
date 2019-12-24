import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
    },
    player: {
        width: '100%',
        height: '100%',
    }
}))


const TrailerVideo = (props) => {
    const classes = useStyles();
    const { trailers } = props;
    return (
        <Grid container spacing={3}>
            {
                trailers ? 
                    <>
                        {trailers.map((trailer, index) => 
                            <Grid item className={classes.wrapper} xs={12}>
                                <iframe key={index} className={classes.player}
                                    src={trailer.url} allowFullScreen>
                                </iframe>
                            </Grid>
                        )}
                    </>
                :
                <Grid item>No trailers</Grid>
            }
        </Grid>
    )
}


export default TrailerVideo;