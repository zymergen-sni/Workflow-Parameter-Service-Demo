import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  stepper: {
    "& button": {
      marginRight: 20
    }
  },
  textField: { margin: 10 },
  addDeleteButton: { marginTop: 14 },
  divider: {
    marginTop: 20,
    marginBottom: 30
  },
  paper: {
    padding: 20,
    minHeight: 800
  }
});

class CreateUsageContext extends React.Component {
  initializeData = () => {
    if (!this.state) {
      this.state = {
        usageContextName: "",
        usageContext: [{ key: "", value: "" }],
        activeStep: 0,
        bulkCreateJson: `
        [{
          specifier:"",
          parameterSets:[""]
        }]
        `
      };
    }
  };

  changeUsageContextName = () => event => {
    const usageContextName = event.target.value;
    this.setState(() => ({
      usageContextName
    }));
  };

  onUsageContextChange = (index, name) => event => {
    let usageContext = this.state.usageContext.slice();
    usageContext[index][name] = event.target.value;
    if (index === usageContext.length - 1) {
      usageContext = [...usageContext, { key: "", value: "" }];
    }
    this.setState(() => ({
      usageContext
    }));
  };

  onUsageContextChange = index => event => {
    let usageContexts = this.state.usageContexts.slice();
    usageContexts[index] = event.target.value;
    if (index === usageContexts.length - 1) {
      usageContexts = [...usageContexts, ""];
    }
    this.setState(() => ({
      usageContexts
    }));
  };

  addNewRow = dataSet => {
    let usageContext = [...this.state.usageContext, { key: "", value: "" }];
    this.setState(() => ({
      usageContext
    }));
  };

  deleteRow = index => () => {
    let usageContext = this.state.usageContext.slice();
    usageContext.splice(index, 1);
    this.setState(() => ({
      usageContext
    }));
  };

  render() {
    const { classes } = this.props;
    this.initializeData();
    const { usageContext, usageContextName, bulkCreateJson } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Create Usage Context By Form</Typography>
            <TextField
              label="Usage Context Name"
              className={classes.textField}
              value={usageContextName}
              onChange={this.changeUsageContextName()}
              margin="normal"
            />
            <Divider className={classes.divider} />
            <Typography variant="subtitle1">Parameter Sets</Typography>
            <form className={classes.container} noValidate autoComplete="off">
              {usageContext.map((param, index) => (
                <div key={index}>
                  <TextField
                    label="Variable Name"
                    className={classes.textField}
                    value={param.key}
                    onChange={this.onUsageContextChange(index, "key")}
                    margin="normal"
                  />
                  <TextField
                    label="Param Set Name"
                    className={classes.textField}
                    value={param.value}
                    margin="normal"
                    onChange={this.onUsageContextChange(index, "value")}
                  />
                  {index === usageContext.length - 1 ? (
                    <IconButton
                      onClick={this.addNewRow}
                      aria-label="Add"
                      className={classes.addDeleteButton}
                    >
                      <AddIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                  {usageContext.length > 1 ? (
                    <IconButton
                      aria-label="Delete"
                      onClick={this.deleteRow(index)}
                      className={classes.addDeleteButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </form>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Create Usage Context By JSON</Typography>
            <TextField
              label="Type or paste JSON here"
              style={{ margin: 8 }}
              fullWidth
              multiline={true}
              rows={10}
              rowsMax={4}
              margin="normal"
              variant="filled"
              value={bulkCreateJson}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

CreateUsageContext.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateUsageContext);
