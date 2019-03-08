import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import Filters from './filter';
import Checkbox from '@material-ui/core/Checkbox';
import TestData from './ParamSetsTestData';
import RefreshIcon from '@material-ui/icons/Refresh';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';

const styles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  gridContainer: {
    flexGrow: 1,
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  paramSetList: {
    marginTop: 0,
    borderTop: '1px solid #ccc',
  },
  paramSetDiv: {
    width: '100%',
    border: '1px solid #ccc',
    fontSize: 15,
    color: 'rgba(113, 113, 113, 0.9)',
    padding: 12,
    borderTop: 'none',
  },
  topCheckbox: {
    height: 50,
    marginLeft: 1,
  },
  checkbox: {
    height: 27,
    paddingLeft: 0,
  },
});

class ParamSetList extends React.Component {
  state = {
    openFilter: false,
    sortBy: 'default',
    defaultSpecificFilter: 'all',
    parameterSets: TestData,
  };

  changeSortBy = (event) => {
    this.setState({
      sortBy: event.target.value,
    });
  };

  onProcessModelFilterChange = (name) => (value) => {
    this.setState({
      [name]: value,
    });
  };

  toggleFilters = () => {
    this.setState((state) => ({ openFilter: !state.openFilter }));
  };

  changeDefaultSpecificFilter = (event) => {
    this.setState({
      defaultSpecificFilter: event.target.value,
    });
  };

  onParamSetCheckboxClick = (index) => (event) => {
    event.stopPropagation();
    const ps = this.state.parameterSets;
    ps[index].selected = !ps[index].selected;
    this.setState((state) => ({
      parameterSets: ps,
    }));
    this.updateTopCheckboxClick();
  };

  onTopCheckboxClick = (event) => {
    const selected = this.state.topCheckbox !== 'all' ? 'all' : '';
    const parameterSets = this.state.parameterSets;
    parameterSets.forEach((item) => (item.selected = selected === 'all'));
    this.setState((state) => ({
      topCheckbox: selected,
      parameterSets: parameterSets,
    }));
  };

  updateTopCheckboxClick = () => {
    let selected = 'all';
    const parameterSets = this.state.parameterSets;
    const selectedParamSetsLength = parameterSets.filter((ps) => ps.selected).length;
    if (selectedParamSetsLength > 0 && selectedParamSetsLength < parameterSets.length) {
      selected = 'partial';
    } else if (selectedParamSetsLength === 0) {
      selected = '';
    }
    this.setState((state) => ({
      topCheckbox: selected,
    }));
  };

  associate = () => {
    const selectedParamSets = this.state.parameterSets.filter((ps) => ps.selected);
    this.props.history.push({
      pathname: '/associate',
      state: {
        data: selectedParamSets,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const { openFilter, parameterSets, topCheckbox } = this.state;
    if (topCheckbox === undefined) {
      this.updateTopCheckboxClick();
    }

    return (
      <div>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item>
            <Paper className={classes.root} elevation={1}>
              <InputBase className={classes.input} placeholder="Search" />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item>
            <Select
              value={this.state.sortBy}
              onChange={this.changeSortBy}
              name="Sort By"
              inputProps={{
                name: 'sortBy',
                id: 'sortBy-simple',
              }}
            >
              <MenuItem value={'default'}>
                <em>Sort By: Default</em>
              </MenuItem>
              <MenuItem value={'createDate'}>Sort By: Create Date</MenuItem>
              <MenuItem value={'name'}>Sort By: Name</MenuItem>
              <MenuItem value={'creator'}>Sort By: Creator</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Select
              value={this.state.defaultSpecificFilter}
              onChange={this.changeDefaultSpecificFilter}
              name="defaultSpecificFilter"
              inputProps={{
                name: 'defaultSpecificFilter',
                id: 'defaultSpecificFilter',
              }}
            >
              <MenuItem value={'all'}>
                <em>All</em>
              </MenuItem>
              <MenuItem value={'default'}>Default</MenuItem>
              <MenuItem value={'specific'}>Specific</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button color="primary" className={classes.button} onClick={this.toggleFilters}>
              Filters
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <Collapse in={openFilter}>
              <Filters />
              <Paper elevation={4} className={classes.paper} />
            </Collapse>
          </Grid>
        </Grid>
        <div>
          <Checkbox
            className={classes.topCheckbox}
            checked={topCheckbox === 'all'}
            onChange={this.onTopCheckboxClick}
            indeterminate={topCheckbox === 'partial' ? true : false}
            color="primary"
          />
          {!topCheckbox || topCheckbox === '' ? (
            <IconButton color="inherit" aria-label="Refresh">
              <RefreshIcon />
            </IconButton>
          ) : (
            <span>
              <IconButton color="default" onClick={this.associate} aria-label="Associate">
                <LinkIcon />
              </IconButton>
              <IconButton color="default" onClick={this.cloneParamSet} aria-label="Clone">
                <FileCopyIcon />
              </IconButton>
              <IconButton color="secondary" aria-label="Delete">
                <DeleteIcon className={classes.delete} />
              </IconButton>
            </span>
          )}
        </div>
        <div className={classes.paramSetList}>
          {parameterSets.map((paramSet, index) => (
            <div key={index} className={classes.paramSetDiv}>
              <Checkbox
                className={classes.checkbox}
                checked={!!paramSet.selected}
                onChange={this.onParamSetCheckboxClick(index)}
                color="primary"
              />
              {paramSet.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ParamSetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ParamSetList);
