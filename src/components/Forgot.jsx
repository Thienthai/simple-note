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

class Forgot extends Component {

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
        auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
        }).catch(function(error) {
            // An error happened.
        });
        alert("Email has been sent please fill out the form to reset password");
        window.location.reload();
        this.setState(() => { this.props.history.push('/login') });
        // auth.createUserWithEmailAndPassword(email, password)
        // .then(authUser => {
        //     console.log(authUser);
        //     var user = authUser;

        //     user.sendEmailVerification().then(function() {
        //     // Email sent.
        //     }).catch(function(error) {
        //     // An error happened.
        //     });
        // })
        // .catch(authError => {
        //     alert(authError);
        // })
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
                            <h1 className={classes.test}>Forgot Password</h1>
                            <p>Enter your email to recieve a new password</p>
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
                                <Button variant="raised" color="primary" type="submit">Send</Button>
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

export default withStyles(styles)(Forgot);