import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './components/nav/nav';
import UsageContextList from './components/usageContext/usageContexts';
import Settings from './components/settings/settings';
import CreateParamSet from './components/paramSet/createParamSet';
import CreateUsageContext from './components/usageContext/createUsageContext';
import { Route, withRouter } from 'react-router-dom';
import BackgroundImg from './assets/header.jpg';
import ParamSet from './components/paramSet/paramSet';
import ParamSetList from './components/paramSet/paramSets';
import Associate from './components/associate/associate';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
    background: '#fff',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    background: '#0000008f',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: '#0f3052',
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: '800px 280px',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  pageName: {
    color: '#fbe183',
    marginLeft: 30,
  },
  drawerPaper: {
    background: '#fafafa',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
    pageName: 'Usage Context Set',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updatePathName = (pathName) => {
    let title = '';
    switch (pathName) {
      case '/createUsageContext':
        title = 'Create Usage Context';
        break;
      case '/createParamSet':
        title = 'Create Parameter Set';
        break;
      case '/settings':
        title = 'Settings';
        break;
      case '/paramSets':
        title = 'Parameter Sets';
        break;
      case '/paramSet':
        title = 'Parameter Set Details';
        break;
      case '/paramSet':
        title = 'Parameter sets';
      case '/associate':
        title = 'Associate';

      default:
        title = 'Usage Contexts';
        break;
    }
    if (this.state.pageName !== title) {
      this.setState({ pageName: title });
    }
  };

  render() {
    const { classes, history } = this.props;
    const someVariable = 'a';
    this.updatePathName(history.location.pathname);
    // Listen to history changes.
    // You can unlisten by calling the constant (`unlisten()`).
    const unlisten = history.listen((location, action) => {
      this.updatePathName(history.location.pathname);
    });
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Workflow Parameter Service
            </Typography>
            <Typography component="h1" variant="subtitle1" noWrap className={classes.pageName}>
              {this.state.pageName}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            <Route path="/" exact render={(props) => <UsageContextList {...props} />} />
            <Route path="/createParamSet" render={(props) => <CreateParamSet {...props} />} />
            <Route
              path="/createUsageContext"
              render={(props) => <CreateUsageContext {...props} />}
            />
            <Route path="/settings" render={(props) => <Settings {...props} />} />
            <Route
              path="/paramSet"
              render={(props) => <ParamSet {...props} extra={someVariable} />}
            />
            <Route path="/paramSets" render={(props) => <ParamSetList {...props} />} />
            <Route path="/associate" render={(props) => <Associate {...props} />} />
          </Typography>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Dashboard));
