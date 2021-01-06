import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './ItemWithSubmenu.css';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(6),
  },
}));

const ItemWithSubmenu = (props) => {
  const [open, setOpen] = useState(false);
  const {icon, primary, children} = props;
  const classes = useStyles();

  const toggle = () => {
    setOpen(! open);
  };

  return (
    <>
      <ListItem button onClick={toggle}>
        {icon && <ListItemIcon>
          {icon}
        </ListItemIcon>}
        {primary && <ListItemText primary={primary} />}
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children && React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              className: [
                child.props.className,
                classes.nested,
              ].join(' '),
            });
          })}
        </List>
      </Collapse>
    </>
  )
}

export default ItemWithSubmenu;
