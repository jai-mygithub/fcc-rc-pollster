import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class SignIn extends Component {

  extractToken() {
    return window.location.href.substring(window.location.href.indexOf("?") + 1);
  }

  componentDidMount() {
    this.props.signInUser(this.extractToken(), () => this.props.history.push('/'));
  }

  render() {
    return (
      <div>
        {this.extractToken()}
      </div>
    );
  }
}

export default connect(null, actions)(SignIn);