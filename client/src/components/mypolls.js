import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyPolls extends Component {
  render() {
    return (
      <div>
        MyPolls
        {this.props.authenticated}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
};

export default connect(mapStateToProps, null)(MyPolls);