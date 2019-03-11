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
import AutocompleteComponent from '../shared/autocompleteComponent.js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const styles = (theme) => ({
  textField: { flexGrow: 1, marginLeft: 10, marginTop: 14 },
  addDeleteButton: { marginTop: 14 },
  paramSetNameLabel: {
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
  typeSelector: {
    height: 50,
  },
  actionsContainer: { display: 'flex' },
  clonePrevious: { display: 'flex', alignItems: 'center' },
  copyNumber: { width: 35, marginTop: 0, '& input': { textAlign: 'right' } },
  clonePreviousButton: { marginLeft: 10 },
  actionButton: { marginRight: 20 },
  buttonsContainer: { marginTop: 40 },
});

const paramOptions = [
  { label: 'Temperature', value: 'temp' },
  { label: 'Shaker Speed', value: 'shakerSpeed' },
  { label: 'Max Batch Size', value: 'maxBatchSize' },
  { label: 'Pool Settings', value: 'poolSettings' },
  { label: 'Platform Group', value: 'platformGroup' },
  { label: 'Test for Params', value: 'test' },
];

class CreateParamSetForm extends React.Component {
  state = { activeStep: 0, copyNumber: 1 };

  getSteps = () => {
    return [
      { default: 'Enter Param Set Name', isActive: 'Enter Param Set Name' },
      {
        isActive: 'Add parameters',
        default:
          this.props.data.definition.length === 1 &&
          this.props.data.definition[0].key === '' &&
          this.props.data.definition[0].value === ''
            ? 'Add parameters'
            : 'Edit parameters',
      },
    ];
  };

  onCopyNumberChange = (event) => {
    const copyNumber = event.target.value;
    this.setState(() => ({
      copyNumber: copyNumber,
    }));
  };

  changeParamSetName = (event) => {
    const paramSetName = event.target.value;
    this.props.data.label = paramSetName;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  onDefinitionChange = (index, name) => (event) => {
    let definition = this.props.data.definition.slice();
    definition[index][name] = event.target.value;
    if (index === definition.length - 1) {
      definition = [...definition, { key: '', value: '', type: 'string' }];
    }
    this.props.data.definition = definition;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  addNewDefinitionRow = (dataSet) => {
    let definition = this.props.data.definition.slice();
    definition = [...definition, { key: '', value: '', type: 'string' }];
    this.props.data.definition = definition;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  deleteDefinitionRow = (index) => () => {
    let definition = this.props.data.definition.slice();
    definition.splice(index, 1);
    this.props.data.definition = definition;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  removeCurrentItem = () => {
    this.props.updateItemsToBeCreated(this.props.index, null);
  };

  reset = () => {
    this.changeActiveStep(0)();
    this.props.data.label = '';
    this.props.data.definition = [{ key: '', value: '' }];
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  updateParentState = (val, index) => {
    this.props.data.definition[index].key = val;
    this.props.updateItemsToBeCreated(this.props.index, this.props.data);
  };

  getStepContent = (step, classes, paramSetName, definition, self) => {
    switch (step) {
      case 0:
        return (
          <TextField
            label=""
            className={classes.textField}
            value={paramSetName}
            onChange={self.changeParamSetName}
            margin="normal"
          />
        );
      case 1:
        return (
          <form className={classes.container} noValidate autoComplete="off">
            {definition.map((param, index) => (
              <div key={index}>
                <AutocompleteComponent
                  updateParentState={this.updateParentState}
                  index={index}
                  value={param.key}
                  options={paramOptions}
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Type"
                  className={classes.textField}
                  value={param.type}
                  onChange={this.onDefinitionChange(index, 'type')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  <MenuItem value={'string'}>String</MenuItem>
                  <MenuItem value={'number'}>Number</MenuItem>
                  <MenuItem value={'boolean'}>Boolean</MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Value"
                  className={classes.textField}
                  value={param.value}
                  margin="normal"
                  onChange={this.onDefinitionChange(index, 'value')}
                />
                {definition.length > 1 ? (
                  <IconButton
                    aria-label="Delete"
                    onClick={this.deleteDefinitionRow(index)}
                    className={classes.addDeleteButton}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  ''
                )}
                {index === definition.length - 1 ? (
                  <IconButton
                    onClick={this.addNewDefinitionRow}
                    aria-label="Add"
                    className={classes.addDeleteButton}
                  >
                    <AddIcon />
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
        return this.props.data.label && this.props.data.label.length > 0;
      case 1:
        return (
          this.props.data.definition.length > 0 &&
          this.props.data.definition[0].key !== '' &&
          this.props.data.definition[0].value !== ''
        );
      default:
        return true;
    }
  };

  render() {
    const { classes, data, collapse, isLast, setCollapse } = this.props;
    if (!data.definition || data.definition.length === 0) {
      data.definition = [{ key: '', value: '', type: 'string' }];
    }
    const { definition } = data;
    const { activeStep, copyNumber } = this.state;
    if (collapse === true && activeStep < 4) {
      this.setState(() => ({
        activeStep: 4,
      }));
      setCollapse(false);
    }
    const paramSetName = data.label;
    const steps = this.getSteps();
    return (
      <div className={classes.stepper}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel error={!this.isValidStep(index) && activeStep > index}>
                {data.label && index === 0 && activeStep !== 0 ? (
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
                      className={classes.paramSetNameLabel}
                      onClick={this.changeActiveStep(index)}
                    >
                      {data.label}
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
                {this.getStepContent(index, classes, paramSetName, definition, this)}
                <div className={classes.actionsContainer}>
                  {index === 0 ? (
                    ''
                  ) : (
                    <Button
                      color="default"
                      disabled={activeStep === 0}
                      className={classes.actionButton}
                      onClick={this.handleBack}
                      variant="contained"
                    >
                      Back
                    </Button>
                  )}
                  {index === 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.actionButton}
                    >
                      Next
                    </Button>
                  )}
                  {index === 1 && (
                    <div className={classes.clonePrevious}>
                      <Typography variant="subtitle1">Make</Typography>
                      <TextField
                        id="standard-number"
                        value={copyNumber}
                        type="number"
                        className={classes.copyNumber}
                        onChange={this.onCopyNumberChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                      <Typography variant="subtitle1">Copy </Typography>
                      <Button
                        color="primary"
                        onClick={this.props.cloneParamSet(data, this.state.copyNumber)}
                        className={classes.clonePreviousButton}
                        variant="contained"
                      >
                        <FileCopyIcon />
                      </Button>
                    </div>
                  )}
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {isLast && (
          <Paper square elevation={0} className={classes.buttonsContainer}>
            <Button className={classes.actionButton} onClick={this.reset}>
              Reset
            </Button>
            <Button
              color="primary"
              onClick={this.props.addNewParamSet}
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

CreateParamSetForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreateParamSetForm);
