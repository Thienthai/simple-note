import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CreateIcon from '@material-ui/icons/Create';

import Icon from 'material-ui/Icon';
import AddIcon from '@material-ui/icons/Add';
import  { Redirect } from 'react-router-dom'
import Main from './Main';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
    	margin: theme.spacing.unit,
  	},
});

class Profile extends Component {

	constructor(props) {
        super(props);
        this.state = {
            name : "",
            email : ""
        }
        this.setName = this.setName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }

	handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    setName(event) {
        const { name, email } = this.state;
        alert("change name to " + name );
        var user = auth.currentUser;

		user.updateProfile({
		  displayName: name
		}).then(function() {
		  // Update successful.
		}).catch(function(error) {
		  // An error happened.
		});
		// this.setState(() => { this.props.history.push('/main') });
  //       window.location.reload();

    }

    setEmail(event){
        const { name, email } = this.state;
        alert("change email to " + email );
        var user = auth.currentUser;

		user.updateEmail(email).then(function() {
		  // Update successful.
		}).catch(function(error) {
		  // An error happened.
		  alert(error);
		});
		// window.location.reload();
		// this.setState(() => { this.props.history.push('/main') });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Grid container className={classes.container}>
            <Grid item xs={4}>
                    </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                    	<h1>Edit Profile</h1>
                    	    
                                <TextField
                                    id="name"
                                    label="Set new name"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={this.handleChange('name')}
                                    />
                                <IconButton onClick={ this.setName } aria-label="Edit">
                                    <CreateIcon />
                                </IconButton>
                                <br />
                                <TextField
                                    id="email"
                                    label="Set new email"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={this.handleChange('email')}
                                    />
                                <IconButton onClick={ this.setEmail } aria-label="Edit">
                                    <CreateIcon />
                                </IconButton>

                                <br />
                                <br />
                          
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Profile);