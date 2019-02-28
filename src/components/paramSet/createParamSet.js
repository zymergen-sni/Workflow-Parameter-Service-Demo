import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReactJson from "react-json-view";
import Divider from "@material-ui/core/Divider";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  actionButton: { marginRight: 20 },
  textField: { margin: 10 },
  addDeleteButton: { marginTop: 14 },
  jsonView: {
    fontSize: 12
  },
  majorButton: { float: "right", margin: 20 },
  title1Div: {
    width: "100%",
    display: "inline-block"
  },
  title1: {
    float: "left"
  },
  or: {
    float: "left",
    marginLeft: 100
  }
});

class CreateParamSet extends React.Component {
  initializeData = () => {
    if (!this.state) {
      this.state = {
        activeStep: 0,
        editMode: false,
        textEditorData: "",
        itemsToBeCreated: [
          {
            label: "",
            definition: [{ key: "", value: "" }],
            usages: [""]
          }
        ]
      };
    }
  };

  resetItemsToBeCreated = () => {
    const defaultData = [
      {
        label: "",
        definition: [{ key: "", value: "" }],
        usages: [""]
      }
    ];
    this.setState(() => ({
      editMode: false,
      itemsToBeCreated: defaultData
    }));
  };

  changeParamSetName = () => event => {
    const paramSetName = event.target.value;
    this.state.itemsToBeCreated[0].label = paramSetName;
    this.setState(() => ({
      itemsToBeCreated: this.state.itemsToBeCreated
    }));
  };

  onEditorChange = event => {
    let newData = event.target.value;
    this.setState(() => ({
      textEditorData: newData
    }));
  };

  onDefinitionChange = (index, name) => event => {
    let definition = this.state.itemsToBeCreated[0].definition.slice();
    definition[index][name] = event.target.value;
    if (index === definition.length - 1) {
      definition = [...definition, { key: "", value: "" }];
    }
    this.state.itemsToBeCreated[0].definition = definition;
    this.setState(() => ({
      itemsToBeCreated: this.state.itemsToBeCreated
    }));
  };

  onUsageContextChange = index => event => {
    let usages = this.state.itemsToBeCreated[0].usages.slice();
    usages[index] = event.target.value;
    if (index === usages.length - 1) {
      usages = [...usages, ""];
    }
    this.state.itemsToBeCreated[0].usages = usages;
    this.setState(() => ({
      itemsToBeCreated: this.state.itemsToBeCreated
    }));
  };

  addNewRow = dataSet => {
    let definition = [...this.state.definition, { key: "", value: "" }];
    this.setState(() => ({
      definition
    }));
  };

  deleteRow = index => () => {
    let definition = this.state.definition.slice();
    definition.splice(index, 1);
    this.setState(() => ({
      definition
    }));
  };
  getSteps = () => {
    return ["Enter Param Set Name", "Add parameters", "Add associations"];
  };

  getStepContent = (step, classes, paramSetName, definition, usages, self) => {
    switch (step) {
      case 0:
        return (
          <TextField
            label=""
            className={classes.textField}
            value={paramSetName}
            onChange={self.changeParamSetName()}
            margin="normal"
          />
        );
      case 1:
        return (
          <form className={classes.container} noValidate autoComplete="off">
            {definition.map((param, index) => (
              <div key={index}>
                <TextField
                  label="Key"
                  className={classes.textField}
                  value={param.key}
                  onChange={this.onDefinitionChange(index, "key")}
                  margin="normal"
                />
                <TextField
                  label="Value"
                  className={classes.textField}
                  value={param.value}
                  margin="normal"
                  onChange={this.onDefinitionChange(index, "value")}
                />
                {index === definition.length - 1 ? (
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
                {definition.length > 1 ? (
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
        );

      case 2:
        return (
          <form className={classes.container} noValidate autoComplete="off">
            {usages.map((usageContext, index) => (
              <div key={index}>
                <TextField
                  label="Usage Context Name"
                  className={classes.textField}
                  value={usageContext}
                  onChange={this.onUsageContextChange(index)}
                  margin="normal"
                />
                {index === usages.length - 1 ? (
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
                {usages.length > 1 ? (
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
        );
      default:
        return "Unknown step";
    }
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  changeActiveStep = index => () => {
    this.setState(() => ({
      activeStep: index
    }));
  };

  onReactJsonClick = event => {
    if (!this.state.editMode && event.target.nodeName !== "SPAN") {
      this.setState(() => ({
        editMode: true,
        textEditorData: JSON.stringify(this.cleanItemsToBeCreated(), null, "  ")
      }));
    }
  };

  saveTextEditorData = () => {
    this.setState(() => ({
      editMode: false,
      itemsToBeCreated: JSON.parse(this.state.textEditorData)
    }));
  };

  cleanItemsToBeCreated = () => {
    return this.state.itemsToBeCreated.map(item => ({
      ...item,
      usages: item.usages.filter(usage => usage.trim() !== ""),
      definition: item.definition.filter(
        def => def.key.trim() !== "" && def.value.trim() !== ""
      )
    }));
  };

  render() {
    const { classes, data } = this.props;
    this.initializeData();
    const {
      itemsToBeCreated,
      activeStep,
      editMode,
      textEditorData
    } = this.state;
    const { definition, usages } = itemsToBeCreated[0];
    const paramSetName = itemsToBeCreated[0].label;
    const steps = this.getSteps();

    return (
      <Grid container spacing={24}>
        <Grid item xs={7}>
          <div className={classes.title1Div}>
            <Typography variant="h6" className={classes.title1}>
              Fill the form to create a single parameter set
            </Typography>
            <Typography variant="h6" className={classes.or}>
              Or
            </Typography>
          </div>

          <div className={classes.stepper}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography
                      variant="subtitle1"
                      onClick={this.changeActiveStep(index)}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    {this.getStepContent(
                      index,
                      classes,
                      paramSetName,
                      definition,
                      usages,
                      this
                    )}
                    <div className={classes.actionsContainer}>
                      <div>
                        {index === 0 ? (
                          ""
                        ) : (
                          <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.actionButton}
                          >
                            Back
                          </Button>
                        )}

                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.actionButton}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  Please review the JSON output to the right before clicking on
                  submit.
                </Typography>
                <Button
                  onClick={this.changeActiveStep(0)}
                  className={classes.button}
                >
                  Reset
                </Button>
              </Paper>
            )}
          </div>
        </Grid>
        <Grid item xs={5} onClick={this.onReactJsonClick}>
          <Typography variant="h6">
            Edit the JSON or drag/drop a file(.json/.csv) below to create
          </Typography>
          {editMode ? (
            <TextField
              label="Type or paste JSON here"
              onChange={this.onEditorChange}
              style={{ margin: 8 }}
              fullWidth
              multiline={true}
              rows={20}
              rowsMax={4}
              margin="normal"
              variant="filled"
              value={textEditorData}
              InputLabelProps={{
                shrink: true
              }}
            />
          ) : (
            <ReactJson
              src={this.cleanItemsToBeCreated()}
              theme="monokai"
              style={{ fontSize: 14, minHeight: 500, padding: 20 }}
              className={classes.jsonView}
            />
          )}

          <Button
            className={classes.majorButton}
            color="primary"
            variant="contained"
            disabled={editMode === true}
          >
            Submit
          </Button>

          {editMode ? (
            <div>
              <Button
                className={classes.majorButton}
                color="primary"
                variant="contained"
                onClick={this.saveTextEditorData}
              >
                Save
              </Button>
              <Button
                onClick={this.resetItemsToBeCreated}
                className={classes.majorButton}
              >
                Reset
              </Button>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    );
  }
}

CreateParamSet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateParamSet);
