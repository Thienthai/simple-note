import React, { Component } from 'react';
import { auth } from '../firebase';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  test: {
    fontFamily:'Tahoma', 
    fontWeight: 100, 
    fontSize: 29,
    color: '#263330',
    marginBottom: -4,
  }
});

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
            var user = authUser;
            alert("successfully create your account please check your email verification");
            user.sendEmailVerification().then(function() {
            // Email sent.
            }).catch(function(error) {
            // An error happened.
            });
        })
        .catch(authError => {
            alert(authError);
        })
        // auth.createUserWithEmailAndPassword(email, password).catch(authError => {
        //     alert(authError);
        //     return;
        // })
        // alert("successfully create account please check your email");

    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        const classes = this.props.classes;
        return (
            <div>
                <Grid container>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <h1 className={classes.test}>Sign up</h1>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <TextField
                                  id="email"
                                  label="Email"
                                  className={classes.textField}
                                  value={email}
                                  onChange={this.handleChange('email')}
                                  margin="normal"
                                  type="email"
                                />
                                <br />
                                <TextField
                                  id="password"
                                  label="Password"
                                  className={classes.textField}
                                  value={password}
                                  onChange={this.handleChange('password')}
                                  margin="normal"
                                  type="password"
                                />
                                <br />
                                <Button variant="raised" color="primary" type="submit">Sign up</Button>
                            </form>
                        </Paper>
                    </Grid>
                  <Grid item xs={4}>
                  </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Signup);