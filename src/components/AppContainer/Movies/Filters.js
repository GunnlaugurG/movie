import React from 'react';
import { Menu, FormControlLabel, Button, IconButton, MenuItem, Checkbox, Typography  } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';


const useStyles = makeStyles(theme => {
    return {
        filterIcon: {
            color: 'white'
        }
    }
})

function Filters(props) {
    let { cinemas, moviesInCinemas, changeHandler, t, activeFiltersArray } = props;
    const classes= useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCinemaChange = (value, cinema) => {
        if ( value ) {
            activeFiltersArray=[...activeFiltersArray, cinema]
        } else {
            activeFiltersArray = activeFiltersArray.filter(x => x !== cinema);
        }
        changeHandler(activeFiltersArray, moviesInCinemas, activeFiltersArray)
    }
    return (
        <>
            <IconButton onClick={handleClick}>
                <FilterListIcon classes={{root: classes.filterIcon}} />
            </IconButton>
            <Menu
                transitionDuration={500}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}> 
                <Typography component="h5">{t('filter.cinema')}</Typography>
                {
                    Object.keys(cinemas).map(cinema => 
                        <FormControlLabel key={cinema}
                            control={ <Checkbox onChange={(event, value) => handleCinemaChange(value, cinema)} value={cinema} /> }
                            label={`${cinema} (${cinemas[cinema]})`} />
                    )
                }
            </Menu>
        </>
    )
}

export default withNamespaces()(Filters);

