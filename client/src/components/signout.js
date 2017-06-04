import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Signout extends Component {

  componentDidMount() {
    this.props.signOutUser();
    window.location.replace('/');
  }

  render() {
    return <div>Sorry to see you go...</div>
  }
}

export default connect(null, actions)(Signout);