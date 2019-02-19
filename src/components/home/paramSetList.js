import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: 10,
    "& >div:last-child": {
      paddingBottom: 0
    }
  },
  cardContent: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: "100%"
  },
  actionButton: {
    margin: "auto"
  },
  divider: {
    height: "100%",
    width: 1
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const options = [
  "Clone",
  "Set as default",
  "Edit variables",
  "Associate with others"
];

const ITEM_HEIGHT = 48;

class ParamSetList extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, data } = this.props;
    const cardStyle = {
      backgroundColor: data.isDefault ? "#edf1cf" : "#ffffff"
    };

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Card className={classes.card} style={cardStyle}>
        <CardContent className={classes.cardContent}>
          <List component="nav" className={classes.list}>
            {data.parameterSet.map((paramSet, index) => (
              <ListItem button key={index} onClick={this.props.toggleDrawer}>
                <ListItemText
                  primary={paramSet.paramSet}
                  secondary={paramSet.variable}
                />
              </ListItem>
            ))}
          </List>
          <Divider className={classes.divider} />
          <div style={{ background: "#fff" }}>
            <div className={classes.actionButton}>
              <IconButton
                aria-label="More"
                aria-owns={open ? "long-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={this.handleClose}
                  >
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ParamSetList);
