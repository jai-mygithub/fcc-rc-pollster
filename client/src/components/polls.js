import axios from 'axios';
import React, { Component } from 'react';

class Polls extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentWillMount() {
    // axios.get('/api/polls')
    //   .then(res => this.setState({ user: res.data.user }))
    //   .catch(req => this.setState({ user: 'All users' }))
  }


  render() {
    return (
      <div>
        Polls for user {this.state.user}
      </div>
    );
  }
}

export default Polls;
