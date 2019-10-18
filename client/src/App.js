import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { loadUser } from './actions/authActions';

import ProtectedRoute from './components/ProtectedRoute';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Redirect from './components/Redirect';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/logout' component={Logout} />
            <Route exact path='/:urlCode' component={Redirect} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;