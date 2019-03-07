import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ParamSetList from './paramSetList';
import Drawer from '@material-ui/core/Drawer';
import ParamSet from '../paramSet/paramSet';
import ReactPaginate from 'react-paginate';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import TestData from './usageContextTestData';

const styles = {
  tableMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    '& ul': {
      display: 'inline-block',
      paddingLeft: 15,
      paddingRight: 15,
      fontSize: 16,
    },

    '& li': {
      display: 'inline-block',
      marginRight: 15,
      color: '#437c98',
      fontWeight: 550,
    },
  },
  topCheckbox: {
    height: 50,
    marginLeft: 14,
  },
  checkbox: {
    height: 27,
    paddingLeft: 0,
  },
  itemName: { marginRight: 10 },
  expansionPanel: {
    '& div': { display: 'flex', justifyContent: 'space-between' },
    '&[aria-expanded=true]': {
      background: '#c4ddec',
    },
  },
  alias: { color: '#1c1d09eb', marginRight: 10 },
  defaultForSpecific: { lineHeight: 1, borderRadius: 15, fontSize: 12 },
  categoryMarker: {
    position: 'absolute',
    width: 7,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#acd45d',
  },
};

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
    outline: '1px solid #169cff',
    marginBottom: 1,
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    '&$expanded': {
      minHeight: 48,
    },
    '& *': { color: 'rgba(113, 113, 113, 0.9)' },
  },
  content: {
    '&$expanded': {
      margin: 0,
    },
    margin: 0,
  },
  expanded: {},
})((props) => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    display: 'block',
    padding: theme.spacing.unit * 2,
    background: '#f2faff',
  },
}))(MuiExpansionPanelDetails);

class MainPanel extends React.Component {
  state = {
    showParamSetDrawer: false,
    usageContexts: TestData,
  };

  expandCollapse = (item) => (event, expanded) => {
    if (event.target.nodeName === 'INPUT') return;
    this.setState((state) => {
      const index = state.usageContexts.findIndex(
        (i) => item.specifier === i.specifier && item.version === i.version,
      );
      state.usageContexts[index].expanded = !state.usageContexts[index].expanded;

      return {
        state,
      };
    });
  };

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  toggleDrawer = (show) => () => {
    this.setState((state) => ({
      showParamSetDrawer: show === undefined ? !state.showParamSetDrawer : show,
    }));
  };

  handlePageClick = () => {};

  onUsageCheckboxClick = (index) => (event) => {
    event.stopPropagation();
    const usages = this.state.usageContexts;
    usages[index].selected = !usages[index].selected;
    this.setState((state) => ({
      usageContexts: usages,
    }));
    this.updateTopCheckboxClick();
  };

  onTopCheckboxClick = (event) => {
    const selected = this.state.topCheckbox !== 'all' ? 'all' : '';
    const usages = this.state.usageContexts;
    usages.forEach((item) => (item.selected = selected === 'all'));
    this.setState((state) => ({
      topCheckbox: selected,
      usageContexts: usages,
    }));
  };

  updateTopCheckboxClick = () => {
    let selected = 'all';
    const usages = this.state.usageContexts;
    const selectedUsagesLength = usages.filter((usage) => usage.selected).length;
    if (selectedUsagesLength > 0 && selectedUsagesLength < usages.length) {
      selected = 'partial';
    } else if (selectedUsagesLength === 0) {
      selected = '';
    }
    this.setState((state) => ({
      topCheckbox: selected,
    }));
  };

  cloneParamSet = () => {
    const selectedUsages = this.state.usageContexts.filter((usage) => usage.selected);
    const selectedUsagesWithActiveParamSets = selectedUsages.map((usage) => ({
      specifier: usage.specifier + '_1',
      parameterSets: usage.parameterSets.find((ps) => ps.isDefault).parameterSet,
    }));
    this.props.history.push({
      pathname: '/createUsageContext',
      state: {
        data: selectedUsagesWithActiveParamSets,
      },
    });
  };

  render() {
    const { topCheckbox } = this.state;
    const { classes } = this.props;
    if (topCheckbox === undefined) {
      this.updateTopCheckboxClick();
    }
    return (
      <div>
        <div className={classes.tableMenu}>
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
                <IconButton color="default" onClick={this.cloneParamSet} aria-label="Clone">
                  <FileCopyIcon />
                </IconButton>
                <IconButton color="secondary" aria-label="Delete">
                  <DeleteIcon className={classes.delete} />
                </IconButton>
              </span>
            )}
          </div>

          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={21}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>

        {this.state.usageContexts.map((item, index) => (
          <ExpansionPanel
            key={item.specifier + item.version}
            square
            expanded={item.expanded === true}
            onChange={this.expandCollapse(item)}
          >
            <ExpansionPanelSummary className={classes.expansionPanel}>
              <div
                className={classes.categoryMarker}
                style={{ background: item.isDefault ? '#acd45d' : '#b67ed2' }}
              />
              <div>
                <Checkbox
                  className={classes.checkbox}
                  checked={!!item.selected}
                  onChange={this.onUsageCheckboxClick(index)}
                  color="primary"
                />
                {item.selected}
                <Typography variant="subtitle1" className={classes.itemName}>
                  {item.specifier}
                </Typography>
                <Typography variant="subtitle1" className={classes.alias}>
                  {item.alias}
                </Typography>
                <Typography variant="subtitle1">{`(${item.parameterSets.length})`}</Typography>
              </div>
              {!item.isDefault ? (
                <div>
                  <Button variant="outlined" color="inherit" className={classes.defaultForSpecific}>
                    Default: B0001:V1.0.2
                  </Button>
                </div>
              ) : (
                ''
              )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {item.parameterSets.map((value, index2) => (
                <ParamSetList key={index2} data={value} toggleDrawer={this.toggleDrawer()} />
              ))}
              <Button variant="contained" className={classes.button}>
                Create New Parmeter Set
                <AddIcon />
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
        <Drawer
          anchor="right"
          open={this.state.showParamSetDrawer}
          onClose={this.toggleDrawer(false)}
        >
          <div tabIndex={0} role="button">
            <ParamSet history={this.props.history} />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPanel);
