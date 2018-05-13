import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase, { auth } from '../firebase';

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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.googleSignin = this.googleSignin.bind(this);
        this.facebookSignin = this.facebookSignin.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
            if(!auth.currentUser.emailVerified){
                alert("your account still not verified please check your email");
                auth.currentUser.sendEmailVerification()
                window.location.assign("http://localhost:3000/");
            }

        })
        .catch(authError => {
            alert(authError);
        })
    }

    googleSignin(event){

        let provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

    }

    facebookSignin(event){
        let provider = new firebase.auth.FacebookAuthProvider()
        auth.signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

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
            <Grid container>
                <Grid item xs={4}>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <h1 className={classes.test}>Log in</h1>
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
                            <br />
                            <Button variant="raised" color="primary" type="submit">Log in</Button>
                        </form>
                        <br />
                              <Button onClick={ this.googleSignin } variant="raised" color="secondary" className={classes.button}>
                                Sign in with google
                              </Button>
                        <br />
                         <br />
                              <Button onClick={ this.facebookSignin } variant="raised" color="primary" className={classes.button}>
                                Sign in with facebook
                              </Button>
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                        <p>Forgot Password? <Link to="/forgot">Click here</Link></p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);