import React, { Component } from 'react';
import { auth } from '../firebase';


class Login extends Component {

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
        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            console.log(authUser);
        })
        .catch(authError => {
            alert(authError);
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <h1>Log in</h1>
                <form onSubmit={this.onSubmit}>
                <input
                  value={email}
                  onChange={this.handleChange('email')}
                  type="text"
                  placeholder="Email Address"
                />
                <input
                  value={password}
                  onChange={this.handleChange('password')}
                  type="password"
                  placeholder="Enter Password"
                />
                <button type="submit">
                    Log in
                </button>
              </form>
            </div>
        );
    }
}

export default Login;