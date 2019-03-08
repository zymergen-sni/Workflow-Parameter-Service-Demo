import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AssociateForm from './associateForm';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AutocompleteComponent from '../shared/autocompleteComponent.js';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  jsonView: {
    fontSize: 12,
  },
  majorButton: { float: 'right', margin: 20 },
  title1Div: {
    width: '100%',
    display: 'inline-block',
  },
  title1: {
    float: 'left',
    fontWeight: 'bold',
  },
  title2: {
    fontWeight: 'bold',
  },
  or: {
    float: 'left',
    marginLeft: 100,
  },
  formsDiv: { display: 'inline-block' },
  divider1: { width: 290 },
  divider2: { marginBottom: 30, marginTop: 10 },
  usageContextGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  usageContextNamePaper: {
    display: 'inline-block',
    padding: '0 10px',
    marginTop: 20,
  },
});

const paramOptions = [
  { label: 'Temperature', value: 'temp' },
  { label: 'Shaker Speed', value: 'shakerSpeed' },
  { label: 'Max Batch Size', value: 'maxBatchSize' },
  { label: 'Pool Settings', value: 'poolSettings' },
  { label: 'Platform Group', value: 'platformGroup' },
  { label: 'Test for Context', value: 'test' },
];

const contextOptions = [
  { label: 'B0001:1.0.1', value: 'B0001:1.0.1' },
  { label: 'C0002:V2.1', value: 'C0002:V2.1' },
];

class CreateAssociation extends React.Component {
  state = {
    association: {
      specifier: '',
      parameterSets: [{ key: '', value: '' }],
    },
    existingParamSets: null,
  };

  updateassociation = (data) => {
    this.setState(() => ({
      association: data,
    }));
  };

  updateExistingParamSets = (data) => {
    this.setState(() => ({
      existingParamSets: data,
    }));
  };

  changeUsageContextName = (event) => {
    const usageContextName = event.target.value;
    this.state.association.specifier = usageContextName;
    this.updateassociation(this.state.association);
  };

  onDefinitionChange = (index, name) => (event) => {
    let parameterSets = this.state.association.parameterSets.slice();
    parameterSets[index][name] = event.target.value;
    if (index === parameterSets.length - 1) {
      parameterSets = [...parameterSets, { key: '', value: '' }];
    }
    this.state.association.parameterSets = parameterSets;
    this.updateassociation(this.state.association);
  };

  addNewRow = (dataSet) => {
    let parameterSets = this.state.association.parameterSets.slice();
    parameterSets = [...parameterSets, { key: '', value: '' }];
    this.state.association.parameterSets = parameterSets;
    this.updateassociation(this.state.association);
  };

  deleteRow = (index) => () => {
    let parameterSets = this.state.association.parameterSets.slice();
    parameterSets.splice(index, 1);
    this.state.association.parameterSets = parameterSets;
    this.updateassociation(this.state.association);
  };

  reset = () => {
    this.changeActiveStep(0)();
    this.state.association.specifier = '';
    this.state.association.parameterSets = [{ key: '', value: '' }];
    this.updateassociation(this.state.association);
  };

  updateParamKey = (val, index) => {
    this.state.association.parameterSets[index].key = val;
    this.updateassociation(this.state.association);
  };

  updateUsageContext = (val) => {
    this.state.association.specifier = val;
    this.updateassociation(this.state.association);
    this.updateExistingParamSets([
      { key: 'qpix_Param_1', value: 'qpix' },
      { key: 'other_param', value: 'some variable' },
    ]);
  };

  render() {
    const { classes } = this.props;
    const { association } = this.state;
    try {
      if (this.props.location.state.data) {
        const paramSets = this.props.location.state.data;
        this.setState(() => ({
          association: {
            specifier: '',
            parameterSets: paramSets.map((ps) => ({ key: ps.label, value: '' })),
          },
        }));
        this.props.location.state.data = null;
        this.props.history.replace('/associate', {});
      }
    } catch (err) {}

    return (
      <Grid container spacing={24}>
        <Grid item xs={7}>
          <div className={classes.title1Div}>
            <Typography variant="h6" className={classes.title1}>
              New parameter sets
            </Typography>
          </div>
          <Divider className={classes.divider1} />
          <div className={classes.formsDiv}>
            <form className={classes.container} noValidate autoComplete="off">
              {association.parameterSets.map((param, index) => (
                <div key={index}>
                  <AutocompleteComponent
                    updateParentState={this.updateParamKey}
                    index={index}
                    value={param.key}
                    options={paramOptions}
                  />
                  <TextField
                    label="Value"
                    className={classes.textField}
                    value={param.value}
                    margin="normal"
                    onChange={this.onDefinitionChange(index, 'value')}
                  />
                  {index === association.parameterSets.length - 1 ? (
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
                  {association.parameterSets.length > 1 ? (
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
          </div>
        </Grid>
        <Grid item xs={5} className={classes.usageContextGrid}>
          <Typography variant="h6" className={classes.title1}>
            Usage context to be associated with
          </Typography>

          <div>
            <AutocompleteComponent
              updateParentState={this.updateUsageContext}
              index={1}
              label={'Usage Context Name'}
              value={this.state.association.specifier}
              options={contextOptions}
            />
          </div>

          {this.state.existingParamSets && (
            <div>
              <Typography variant="h6" className={classes.title1}>
                Existing parameter sets
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Param Name</TableCell>
                    <TableCell align="right">Variable Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.existingParamSets.map((ps) => (
                    <TableRow key={ps.key}>
                      <TableCell component="th" scope="row">
                        {ps.key}
                      </TableCell>
                      <TableCell align="right">{ps.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div>
                <Button variant="contained" color="primary" className={classes.actionButton}>
                  Create association
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

CreateAssociation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAssociation);
