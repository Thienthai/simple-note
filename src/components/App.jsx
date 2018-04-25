
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Main from './Main';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
    render () {
        return (
            <div>
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
            </div>
        );
    }
}

export default App;