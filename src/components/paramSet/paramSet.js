import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditdIcon from "@material-ui/icons/Edit";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import AddIcon from "@material-ui/icons/Add";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const styles = theme => ({
  root: { margin: 20 },
  button: { marginRight: 10, marginTop: 20, marginBottom: 20 },
  versionSelecrt: { float: "right" },
  usages: { marginTop: 40 }
});

const paramSetData = {
  name: "exampleParamSet0",
  definition: [
    { maxBatchSize: 2, anotherParam: "some text" },
    { maxBatchSize: 1 }
  ],
  usages: [
    "B0001:v1.0.2",
    "flowId:workflowPhaseCA:buildingBlockCA:unitCA",
    "flowId:workflowPhaseCA",
    "aProcessDef:v1.0.0"
  ]
};

const { definition } = paramSetData;

class ParamSet extends React.Component {
  state = { version: 0 };

  render() {
    const { classes, theme } = this.props;
    const { openFilter, processModelFilter } = this.state;

    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          {paramSetData.name}

          <IconButton aria-label="Full Screen" aria-haspopup="false" href="/paramSet">
            <FullscreenIcon />
          </IconButton>
          <FormControl className={classes.versionSelecrt}>
            <Select
              value={this.state.version}
              onChange={this.changeVersion}
              name="Version"
              inputProps={{
                name: "version",
                id: "version"
              }}
            >
              <MenuItem value={0}>
                <em>Latest</em>
              </MenuItem>
              <MenuItem value={1}>V1</MenuItem>
              <MenuItem value={2}>V2</MenuItem>
            </Select>

            <FormHelperText>Version</FormHelperText>
          </FormControl>
        </Typography>

        <Button variant="contained" className={classes.button}>
          Edit
          <EditdIcon className={classes.rightIcon} />{" "}
        </Button>
        <Button variant="contained" className={classes.button}>
          Clone
          <FileCopyIcon className={classes.rightIcon} />
        </Button>
        <Button variant="contained" className={classes.button}>
          Set as default
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Delete
          <DeleteIcon className={classes.rightIcon} />
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Param Name</TableCell>
              <TableCell align="right">Param Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(definition[0]).map(key => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">{definition[0][key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography
          className={classes.usages}
          component="h6"
          variant="h6"
          color="inherit"
          noWrap
        >
          Currently associate with:
          <IconButton aria-label="Delete">
            <AddIcon />
          </IconButton>
        </Typography>
        <div>
          <List>
            {paramSetData.usages.map(usage => (
              <ListItem key={usage}>
                <ListItemAvatar>
                  <Avatar>
                    <BubbleChartIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={usage} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" className={classes.button}>
            View all in main screen
          </Button>
        </div>
      </div>
    );
  }
}

ParamSet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ParamSet);
