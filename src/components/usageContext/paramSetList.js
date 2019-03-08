import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemText from '@material-ui/core/ListItemText';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = (theme) => ({
  card: {
    width: '100%',
    marginBottom: 10,
    '& >div:last-child': {
      paddingBottom: 0,
    },
  },
  cardContent: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  list: {
    width: '100%',
  },
  listItem: {
    '&:hover div': {
      visibility: 'visible',
    },
  },
  listText: {
    flexGrow: 0,
  },
  actionButton: {
    margin: 'auto',
  },
  paramSetButtonDiv: {
    visibility: 'hidden',
  },
  divider: {
    height: '100%',
    width: 1,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const options = ['Set collection as active', 'Remove collection'];

const ITEM_HEIGHT = 48;

class ParamSetList extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    event.stopPropagation();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, data } = this.props;
    const cardStyle = {
      backgroundColor: data.isDefault ? '#edf1cf' : '#ffffff',
    };

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Card className={classes.card} style={cardStyle}>
        <CardContent className={classes.cardContent}>
          <List component="nav" className={classes.list}>
            {data.parameterSet.map((paramSet, index) => (
              <ListItem
                className={classes.listItem}
                button
                key={index}
                onClick={this.props.toggleDrawer}
              >
                <ListItemText
                  className={classes.listText}
                  primary={paramSet.value}
                  secondary={paramSet.key}
                />
                <div className={classes.paramSetButtonDiv}>
                  <IconButton aria-label="Edit" aria-haspopup="true">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Remove" color="secondary" aria-haspopup="true">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
            ))}
          </List>
          <Divider className={classes.divider} />
          <div style={{ background: '#fff' }}>
            <div className={classes.actionButton}>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'collection-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="collection-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} selected={false} onClick={this.handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
ParamSetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParamSetList);
