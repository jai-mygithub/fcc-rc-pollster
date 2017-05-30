import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import { AUTH_USER } from './actions/types';
import reducers from './reducers';
import Header from './components/header';
import Polls from './components/polls';
import MyPolls from './components/mypolls';
import NewPoll from './components/newpoll';
import SignIn from './components/signin';
import SignOut from './components/signout';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path='/' component={Header} />
        <Switch>
          <Route path='/polls' component={Polls} />
          <Route path='/mypolls' component={MyPolls} />
          <Route path='/newpoll' component={NewPoll} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signout' component={SignOut} />
          <Redirect from='/' to='/polls' />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));