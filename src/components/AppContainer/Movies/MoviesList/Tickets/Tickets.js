import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
const useStyles = makeStyles(theme => ({
    paper: {
        marginBottom: '1em',
        backgroundColor: 'rgba(0,0,0, 0.4)',
        color: 'white'
    },
    cinemaName: {
        marginBottom: 'auto',
        paddingLeft: '10px'
    },
    time: {
        border: '1px solid white',
        marginRight: '1em'
    }
}));

function Tickets(props) {
    const classes = useStyles();
    const { showtimes } = props;
    const openNewTap = link => {
        window.open(link, "_blank")
    }

    return (
        <>
            {showtimes ?
                showtimes.map((show, index) => {
                    return (<Paper className={classes.paper} key={index}>
                        <p className={classes.cinemaName}>{show.cinema.name}</p>
                        {show.schedule.map((schedule, index2) => {
                            return(
                                <Button className={classes.time} key={index+"-"+index2} onClick={() => openNewTap(schedule.purchase_url)} color="inherit">{schedule.time}</Button>
                            )
                        })}
                    </Paper>)
                }) 
                : <p>No tickets available</p>
            }
        
        </>

    )
}

export default withNamespaces()(Tickets);