import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'relative',
        paddingTop: '56.25% !important'
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
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
                            <Grid item key={trailer.id} className={classes.wrapper} xs={12}>
                                <iframe className={classes.player}
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