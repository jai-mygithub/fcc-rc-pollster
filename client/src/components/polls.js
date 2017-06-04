import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Polls extends Component {

  constructor(props) {
    super(props);
    this.state = { pollList: [], count: 999 }
  }

  componentDidMount() {
    var self = this;
    axios.get('/api/polls', { headers: { 'Cache-control': 'no-cache' } })
      .then(res => {
        self.setState({ pollList: res.data })
        self.setState({ count: res.data.options.length || 999 })
      })
      .catch(err => console.log('Unable to get polls', err))
  }


  render() {
    return (
      <div>
        <div className='jumbotron nopolls' style={{ display: this.state.count > 0 ? 'none' : 'block' }}>
          <h1>There are no polls to show</h1>
          <h1><Link className='nav-link' to='/newpoll' >Create one!</Link></h1>
        </div>
        <ul className='list-group'>
          {this.state.pollList.map(poll => {
            return <a
              className='list-group-item list-group-item-action'
              href={`/polls/${poll.pollId}`}
              key={poll.pollId}>
              {poll.title}
              <span
                className='badge badge-default badge-pill' >
                {poll.options.reduce((total, poll) => { return total + poll.count }, 0)} votes in {poll.options.length} options
              </span>
            </a>
          }
          )}
        </ul>
      </div>
    );
  }
}

export default Polls;