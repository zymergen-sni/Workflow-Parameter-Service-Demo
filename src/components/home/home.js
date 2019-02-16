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

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  gridContainer: {
    flexGrow: 1,
    marginBottom: 15
  },
  formControl: {
    margin: 10,
    minWidth: 120
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  }
});

class Home extends React.Component {
  state = {
    openFilter: false,
    sortBy: 'default'
  };

  changeSortBy = event => {
    this.setState({
      sortBy: event.target.value
    });
  };

  onProcessModelFilterChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  toggleFilters = () => {
    this.setState(state => ({ openFilter: !state.openFilter }));
  };
  render() {
    const { classes, theme } = this.props;
    const { openFilter, processModelFilter } = this.state;

    return (
      <div>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item>
            <Paper className={classes.root} elevation={1}>
              <InputBase className={classes.input} placeholder='Search' />
              <IconButton className={classes.iconButton} aria-label='Search'>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item>
            <Select
              value={this.state.sortBy}
              onChange={this.changeSortBy}
              name='Sort By'
              inputProps={{
                name: 'sortBy',
                id: 'sortBy-simple'
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
            <Button
              color='primary'
              className={classes.button}
              onClick={this.toggleFilters}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12}>
            <Collapse in={openFilter}>
              <Filters />
              <Paper elevation={4} className={classes.paper}>
                {/* <form className={classes.root} autoComplete='off'>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='age-simple'>Age</InputLabel>
                    <Select
                      value={this.state.age}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'age',
                        id: 'age-simple'
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>{' '}
                </form> */}
              </Paper>
            </Collapse>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
