import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import { AUTH_USER } from './actions/types';
import reducers from './reducers';
import Header from './components/header';
import Polls from './components/polls';
import PollDetails from './components/polldetails';
import MyPolls from './components/mypolls';
import NewPoll from './components/newpoll';
import SignIn from './components/signin';
import SignOut from './components/signout';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(reduxThunk)
));

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
          <Route path='/polls/:pollId' component={PollDetails} />
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