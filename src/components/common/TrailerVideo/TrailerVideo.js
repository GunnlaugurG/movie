import React from 'react';
import { Grid } from '@material-ui/core';

const TrailerVideo = (props) => {
    const { trailers } = props;
    console.log(trailers);
    return (
        <Grid container>
            <Grid item>
            {
                trailers ? 
                    <iframe style={{width: '100%', height: '100%'}}
                        src={trailers[0].url} allowFullScreen>
                    </iframe>
                :
                <>No trailers</>
            }
            </Grid>
        </Grid>
    )
}


export default TrailerVideo;