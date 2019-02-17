import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ParamSetList from "./paramSetList";
import Drawer from "@material-ui/core/Drawer";
import ParamSet from "../paramSet/paramSet";
import ReactPaginate from "react-paginate";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const styles = {
  paginate: {
    "& ul": {
      display: "inline-block",
      paddingLeft: 15,
      paddingRight: 15,
      fontSize: 16
    },

    "& li": {
      display: "inline-block",
      marginRight: 15,
      color: "#3887ad",
      fontWeight: 550
    }
  }
};

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    margin: "auto"
  }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "#448bcc",
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    },
    "& *": { color: "rgba(255, 255, 255, 0.9)" }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    display: "block",
    padding: theme.spacing.unit * 2
  }
}))(MuiExpansionPanelDetails);

class MainPanel extends React.Component {
  state = {
    showParamSetDrawer: false,
    usageContexts: [
      {
        name: "B0001:v1.0.2",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_001"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_002"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          }
        ]
      },
      {
        name: "B0001_call2:W1008_call1:M7777",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },
      {
        name: "B0001_call1:W1008_call2:M7777",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          }
        ]
      },

      {
        name: "E0001_call2:F1002_call1:M6677",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "G0001_call2:W1019_call1:M6679",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "F0001_call2:B1008_call1:A1001",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "B0001_call3:W1008_call2:G1022",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "C0001_call4:Z1008_call1:E2990",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "B0001_call2:W1008_call1:G2000",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "C0001_call2:W1008_call1:G2000",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      },

      {
        name: "B0001_call5:C1_call1:E1029",
        version: 1,
        parameterSets: [
          {
            isDefault: true,
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_002"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_003"
              }
            ]
          },
          {
            parameterSet: [
              {
                variable: "tecanParams",
                paramSet: "tecan_echo_003"
              },
              {
                variable: "poolSettings",
                paramSet: "pooling_settings_004"
              }
            ]
          }
        ]
      }
    ]
  };

  expandCollapse = item => (event, expanded) => {
    this.setState(state => {
      const index = state.usageContexts.findIndex(
        i => item.name === i.name && item.version === i.version
      );
      state.usageContexts[index].expanded = !state.usageContexts[index]
        .expanded;

      return {
        state
      };
    });
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  toggleDrawer = show => () => {
    this.setState(state => ({
      showParamSetDrawer: show === undefined ? !state.showParamSetDrawer : show
    }));
  };

  handlePageClick = () => {};

  render() {
    const { expanded } = this.state;
    const { classes, theme } = this.props;
    return (
      <div className={classes.paginate}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={21}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        {this.state.usageContexts.map((item, key) => (
          <ExpansionPanel
            key={item.name + item.version}
            square
            expanded={item.expanded === true}
            onChange={this.expandCollapse(item)}
          >
            <ExpansionPanelSummary>
              <Typography variant="h6">{item.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {item.parameterSets.map((paramSet, index) => (
                <ParamSetList
                  key={index}
                  data={paramSet}
                  toggleDrawer={this.toggleDrawer()}
                />
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
            <ParamSet />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPanel);
