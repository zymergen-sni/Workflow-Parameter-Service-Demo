import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const processDefKeys = [
  { label: 'B0001' },
  { label: 'B0002' },
  { label: 'B0003' },
  { label: 'C0001' },
  { label: 'C0002' },
  { label: 'E0018' },
  { label: 'E1009' },
  { label: 'F1029' },
  { label: 'F2030' },
  { label: 'W1008' },
].map((suggestion) => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const callActivityIds = [
  { label: 'B0001_call1' },
  { label: 'B0001_call2' },
  { label: 'B0003_call1' },
  { label: 'B0003_call2' },
  { label: 'C0001_call1' },
  { label: 'C0001_call2' },
  { label: 'C0002_call1' },
  { label: 'E0018_call1' },
  { label: 'E1009_call1' },
  { label: 'F1029_call1' },
  { label: 'F2030_call1' },
  { label: 'W1008_call1' },
].map((suggestion) => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const multiInstanceIds = [{ label: 'multi_instance_1' }, { label: 'multi_instance_2' }].map(
  (suggestion) => ({
    value: suggestion.label,
    label: suggestion.label,
  }),
);

const parallelGatewayIds = [{ label: 'parallel_gateway_1' }, { label: 'parallel_gateway_2' }].map(
  (suggestion) => ({
    value: suggestion.label,
    label: suggestion.label,
  }),
);

const styles = (theme) => ({
  root: { marginTop: 15 },
  filterGrid: {
    flexGrow: 1,
    height: 60,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Filters extends React.Component {
  state = {
    single: null,
    multi: null,
  };

  handleChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, theme } = this.props;
    this.state = {
      filter: {},
    };

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={3} className={classes.filterGrid}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={processDefKeys}
              components={components}
              value={this.state.filter.processDefKey}
              onChange={this.handleChange('multi')}
              placeholder="Process Def Key"
              isMulti
            />
          </NoSsr>
        </Grid>
        <Grid item xs={3} className={classes.filterGrid}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={callActivityIds}
              components={components}
              value={this.state.filter.fromCallActivityId}
              onChange={this.handleChange('multi')}
              placeholder="From Call Activity ID"
              isMulti
            />
          </NoSsr>
        </Grid>
        <Grid item xs={3} className={classes.filterGrid}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={multiInstanceIds}
              components={components}
              value={this.state.filter.multiInstanceId}
              onChange={this.handleChange('multi')}
              placeholder="Multi Instance ID"
              isMulti
            />
          </NoSsr>
        </Grid>
        <Grid item xs={3} className={classes.filterGrid}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={parallelGatewayIds}
              components={components}
              value={this.state.filter.parallelGatewayId}
              onChange={this.handleChange('multi')}
              placeholder="Parallel Gateway ID"
              isMulti
            />
          </NoSsr>
        </Grid>
        <Grid item xs={3} className={classes.filterGrid}>
          <NoSsr>
            <Select
              classes={classes}
              styles={selectStyles}
              options={callActivityIds}
              components={components}
              value={this.state.filter.toCallActivityId}
              onChange={this.handleChange('multi')}
              placeholder="To Call Activity ID"
              isMulti
            />
          </NoSsr>
        </Grid>
        <Grid item>
          <Button color="primary" className={classes.button} onClick={this.toggleFilters}>
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Filters);
