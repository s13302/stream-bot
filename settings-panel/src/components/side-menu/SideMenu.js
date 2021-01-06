import React from 'react';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExtensionIcon from '@material-ui/icons/Extension';
import RedeemIcon from '@material-ui/icons/Redeem';
import StorageIcon from '@material-ui/icons/Storage';
import StarIcon from '@material-ui/icons/Star';
import BlockIcon from '@material-ui/icons/Block';
import TimerIcon from '@material-ui/icons/Timer';
import HelpIcon from '@material-ui/icons/Help';

import './SideMenu.css';
import ItemWithSubmenu from './item-with-submenu/ItemWithSubmenu';

const SideMenu = ({ history, className, paperClassName }) => {
  return (
    <>
      <Drawer variant="permanent" className={className} classes={{
        paper: paperClassName,
      }}>
        <List>
          <ListItem button onClick={() => history.push('/twitch-auth')}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Login to Twitch" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ItemWithSubmenu icon={<ExtensionIcon />} primary="Commands">
            <ListItem button onClick={() => history.push('/commands/default')}>
              <ListItemText primary="Default Commands" />
            </ListItem>
            <ListItem button onClick={() => history.push('/commands/custom')}>
              <ListItemText primary="Custom Commands" />
            </ListItem>
          </ItemWithSubmenu>
          <ListItem button>
            <ListItemIcon>
              <RedeemIcon />
            </ListItemIcon>
            <ListItemText primary="Giveaways" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Regulars" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <ListItemText primary="Spam Protection" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="Timers" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default withRouter(SideMenu);