import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth } from '../firebase';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import PrivateRoute from './PrivateRoute';
import Main from './Main';
import Login from './Login';
import Signup from './Signup';
import Forgot from './Forgot';
import Profile from './Profile';
import blue from 'material-ui/colors/blue';

const theme = createMuiTheme();

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  align: "right"
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            currentUser: null,
            verification: false
        };
    }

    componentWillMount() { auth.onAuthStateChanged(user => {

        if (user) {
            this.setState({
                authenticated: true,
                currentUser: user,
                loading: false },
                () => { this.props.history.push('/') }
            );
        } else {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false
            });
        }
        });
    }

    render () {
        const { authenticated, loading } = this.state;
        const classes = this.props.classes;
        const content = loading ? (
            <div align="center">
                <CircularProgress size={80} thickness={5} />
            </div>
        ) : (
            <div>
                <PrivateRoute
                    exact
                    path="/"
                    component={Main}
                    authenticated={authenticated}
                    />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/main" component={Main} />
            </div>
        );
        return (
            <MuiThemeProvider theme={theme}>
                <div align="center">
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                    <AppBar styles="opacity:80%" position="static" background-color="#ea3f3f">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                SimpleNote
                            </Typography>
                            &nbsp;&nbsp;
                            { authenticated &&
                                <Button className="button" size="small" variant="raised" color="secondary" onClick={() => auth.signOut()}>Log out</Button>
                            }
                        </Toolbar>
                    </AppBar>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    { content }
                </div>
            </MuiThemeProvider>
         );
    }
}

export default withRouter(App);