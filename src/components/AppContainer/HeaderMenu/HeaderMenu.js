import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, Typography, Divider, Fade } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withNamespaces } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import i18n from '../../../i18n';
import Snack from '../../common/SnackBar/Snack'
import { withCookies } from 'react-cookie';
import ice from '../../../icons/iceland.png';
import uk from '../../../icons/united-kingdom.png';

const useStyles = makeStyles(theme => ({
    listItemIconRoot: {
        justifyContent: 'flex-end'
    },
    menuItemRoot: {
        justifyContent: 'space-between'
    },
    menuButton: {
        '&:focus': {
            'outline': 'none !important'
        }
    }
}))

const HeaderMenu = props => {
    const { t, cookies } = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [SnackBaropen, setOpenSnackBar] = React.useState(false);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeLanguage = (lng) => {
        cookies.set('lang', lng, {
          // set cookies for on year
          maxAge: 31536000,
          sameSite: true
        })
        i18n.changeLanguage(lng);
        setOpenSnackBar(true);
        handleClose();
      }

    return (
        <>
            <IconButton aria-label="more" color="inherit" aria-controls="long-menu" 
                        classes={{root: classes.menuButton}} aria-haspopup="true"
                        onClick={handleClick}>
                <MoreVertIcon color="inherit"/>
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                <Typography variant="inherit" component="h5" style={{'paddingLeft': '14px'}}>Languages</Typography>
                <Divider/>
                <MenuItem classes={{root: classes.menuItemRoot}} onClick={() => changeLanguage('is')}>
                    <Typography variant="inherit">Íslenska</Typography>
                    <ListItemIcon classes={{ root: classes.listItemIconRoot}}>
                        <img src={ice} height="32px" alt="is"/>
                    </ListItemIcon>
                </MenuItem>
                <MenuItem classes={{root: classes.menuItemRoot}} onClick={() => changeLanguage('en')}>
                    <Typography variant="inherit">English</Typography>
                    <ListItemIcon classes={{ root: classes.listItemIconRoot}}>
                        <img src={uk} height="32px" alt="en"/>
                    </ListItemIcon>
                </MenuItem>
            </Menu>

            <Snack  SnackBaropen={SnackBaropen} 
                    setOpenSnackBar={setOpenSnackBar} 
                    message={t('language-changed')} 
                    variant="success" />
        </>
    )
}


export default withCookies(withNamespaces()(HeaderMenu));