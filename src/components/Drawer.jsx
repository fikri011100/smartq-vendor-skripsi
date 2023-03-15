import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from '../common/Firebase/authContext';
import { Link } from 'react-router-dom';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './Drawer.css';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
export default function SwipeableTemporaryDrawer() {
   const {currentUser} = useAuth();
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

  const list = (anchor) => (
    <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
            <Link to={'/antrian/'+currentUser.uid} className="drawer-link">
                <ListItem button>
                    <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                    <ListItemText primary="Antrian" />
                </ListItem>
            </Link>
            <Link to='/dashboard' className="drawer-link">
                <ListItem button>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>
            <Link to={'/history/'+currentUser.uid} className="drawer-link">
                <ListItem button>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText primary="Riwayat Antrian" />
                </ListItem>
            </Link>
            {/*<Link to='/pegawai' className="drawer-link">
                <ListItem button>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary="Pegawai" />

                </ListItem>
            </Link> */}
            <Link to='/setelan' className="drawer-link">
                <ListItem button>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Setelan" />
                </ListItem>
            </Link>
        </List>
    </div>
  );

    return (
        <div>
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)} >
                            <MenuIcon />
                        </IconButton>
                        <h2 className={classes.title}>
                            SmartQ
                        </h2>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer
                    anchor="left"
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
