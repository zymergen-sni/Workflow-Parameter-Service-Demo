import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ParamAutocomplete from '../paramSet/paramAutocomplete.js';

const styles = (theme) => ({
  actionButton: { marginRight: 20 },
  textField: { margin: 10, flexGrow: 1 },
  addDeleteButton: { marginTop: 14 },
  usageContextNameLabel: {
    color: '#ca6b23',
    float: 'left',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  stepLabel: {
    float: 'left',
  },
  deleteSetIcon: {
    color: '#999',
    cursor: 'pointer',
    marginLeft: 10,
    '&:hover': { color: '#777' },
  },
});

class CreateUsageContextsForm extends React.Component {
  state = { activeStep: 0 };

  getSteps = () => {
    return [
      { default: 'Enter Usage Context Name', isActive: 'Enter Usage Context Name' },
      {
        isActive: 'Add parameters',
        default:
          this.props.data.parameterSets.length === 1 &&
          this.props.data.parameterSets[0].key === '' &&
          this.props.data.parameterSets[0].value === ''
            ? 'Add parameters'
            : 'Edit parameters',
      },
    ];
  };

  changeUsageContextName = (event) => {
    const usageContextName = event.target.value;
    this.props.data.specifier = usageContextName;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  onDefinitionChange = (index, name) => (event) => {
    let parameterSets = this.props.data.parameterSets.slice();
    parameterSets[index][name] = event.target.value;
    if (index === parameterSets.length - 1) {
      parameterSets = [...parameterSets, { key: '', value: '' }];
    }
    this.props.data.parameterSets = parameterSets;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  addNewRow = (dataSet) => {
    let parameterSets = this.props.data.parameterSets.slice();
    parameterSets = [...parameterSets, { key: '', value: '' }];
    this.props.data.parameterSets = parameterSets;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  deleteRow = (index) => () => {
    let parameterSets = this.props.data.parameterSets.slice();
    parameterSets.splice(index, 1);
    this.props.data.parameterSets = parameterSets;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  removeCurrentItem = () => {
    this.props.updateItemsToBeCreated(this.props.index, null);
  };

  reset = () => {
    this.changeActiveStep(0)();
    this.props.data.specifier = '';
    this.props.data.parameterSets = [{ key: '', value: '' }];
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  updateParentState = (val, index) => {
    this.props.data.parameterSets[index].key = val;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  getStepContent = (step, classes, usageContextName, parameterSets, self) => {
    switch (step) {
      case 0:
        return (
          <TextField
            label=""
            className={classes.textField}
            value={usageContextName}
            onChange={self.changeUsageContextName}
            margin="normal"
          />
        );
      case 1:
        return (
          <form className={classes.container} noValidate autoComplete="off">
            {parameterSets.map((param, index) => (
              <div key={index}>
                {/* <TextField
                  label="Key"
                  className={classes.textField}
                  value={param.key}
                  onChange={this.onDefinitionChange(index, "key")}
                  margin="normal"
                /> */}
                <ParamAutocomplete
                  updateParentState={this.updateParentState}
                  index={index}
                  value={param.key}
                />
                <TextField
                  label="Value"
                  className={classes.textField}
                  value={param.value}
                  margin="normal"
                  onChange={this.onDefinitionChange(index, 'value')}
                />
                {index === parameterSets.length - 1 ? (
                  <IconButton
                    onClick={this.addNewRow}
                    aria-label="Add"
                    className={classes.addDeleteButton}
                  >
                    <AddIcon />
                  </IconButton>
                ) : (
                  ''
                )}
                {parameterSets.length > 1 ? (
                  <IconButton
                    aria-label="Delete"
                    onClick={this.deleteRow(index)}
                    className={classes.addDeleteButton}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  ''
                )}
              </div>
            ))}
          </form>
        );
      default:
        return 'Unknown step';
    }
  };

  handleNext = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  changeActiveStep = (index) => () => {
    if (index === this.state.activeStep) {
      index = this.getSteps().length;
    }
    this.setState(() => ({
      activeStep: index,
    }));
  };

  isValidStep = (index) => {
    switch (index) {
      case 0:
        return this.props.data.specifier && this.props.data.specifier.length > 0;
      case 1:
        return (
          this.props.data.parameterSets.length > 0 &&
          this.props.data.parameterSets[0].key !== '' &&
          this.props.data.parameterSets[0].value !== ''
        );
      default:
        return true;
    }
  };

  render() {
    const { classes, data, isLast, collapse, setCollapse } = this.props;
    if (!data.parameterSets || data.parameterSets.length === 0) {
      data.parameterSets = [{ key: '', value: '' }];
    }
    const { parameterSets } = data;
    const { activeStep } = this.state;
    if (collapse === true && activeStep < 3) {
      this.setState(() => ({
        activeStep: 3,
      }));
      setCollapse(false);
    }
    const usageContextName = data.specifier;
    const steps = this.getSteps();
    return (
      <div className={classes.stepper}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel error={!this.isValidStep(index) && activeStep > index}>
                {data.specifier && index === 0 && activeStep !== 0 ? (
                  <div>
                    <Typography
                      variant="subtitle1"
                      className={classes.stepLabel}
                      onClick={this.changeActiveStep(index)}
                    >
                      {this.props.index}:
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.usageContextNameLabel}
                      onClick={this.changeActiveStep(index)}
                    >
                      {data.specifier}
                    </Typography>
                    {this.props.itemsToBeCreated.length > 1 && (
                      <DeleteIcon
                        className={classes.deleteSetIcon}
                        onClick={this.removeCurrentItem}
                      />
                    )}
                  </div>
                ) : (
                  <Typography variant="subtitle1" onClick={this.changeActiveStep(index)}>
                    {label[index === this.state.activeStep ? 'isActive' : 'default']}
                  </Typography>
                )}
              </StepLabel>
              <StepContent>
                {this.getStepContent(index, classes, usageContextName, parameterSets, this)}
                <div className={classes.actionsContainer}>
                  <div>
                    {index === 0 ? (
                      ''
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
        {isLast && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Button onClick={this.reset} className={classes.actionButton}>
              Reset
            </Button>
            <Button
              color="primary"
              onClick={this.props.addNewUsageContext}
              className={classes.actionButton}
              variant="contained"
            >
              <AddIcon />
              Add more
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

CreateUsageContextsForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreateUsageContextsForm);
