import axios from 'axios';
import React, { Component } from 'react';
import Chart from './chart';
import { connect } from 'react-redux';

class PollDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pollId: this.props.match.params.pollId,
      title: '',
      options: [],
      selected: null,
      badgeColor: [],
      customVote: ''
    }
  }

  componentDidMount() {
    this.getPollDetails();
  }


  getPollDetails = () => {
    this.setState({
      selected: null,
      customVote: ''
    });
    axios.get(`/api/polls/${this.state.pollId}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          options: res.data.options
        });
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data);
          this.props.history.push('/');
        }
      });
  }

  submitVote = () => {
    axios.post('/api/newvote', {
      pollId: this.state.pollId,
      selected: this.state.selected
    })
      .then(res => {
        this.getPollDetails();
      })
      .catch(() => console.log('Unable to vote'));
  };

  createOptionAndSubmit = () => {
    axios.post('/api/newoption',
      { pollId: this.state.pollId, title: this.state.customVote },
      { headers: { authorization: localStorage.getItem('token') } }
    )
      .then(res => {
        this.getPollDetails();
      })
      .catch(() => console.log('Unable to vote'));
  }

  makeOptionsButtonList = () => {
    var listItemArray = this.state.options.map((optionObj, index) => {
      return (
        <a
          key={index}
          className={`list-group-item ${index === this.state.selected ? ' list-group-item-success' : ''}`}
          onClick={() => this.setState({ selected: index })}>
          {optionObj.title}
          <span className='badge badge-default badge-pill' style={{ backgroundColor: this.state.badgeColor[index] }} >{optionObj.count}</span>
        </a>
      )
    });
    listItemArray.push(
      <a
        style={{ padding: '0px' }}
        key={-1}
        className={`list-group-item`}
        onClick={() => this.setState({ selected: -1 })}>
        <input
          type='text'
          onChange={(event) => this.setState({ customVote: event.target.value })}
          value={this.state.customVote}
          style={{ height: '40px' }}
          placeholder='Add your own option'
          className='form-control' />
      </a>
    )
    return listItemArray;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.selected !== null && this.state.selected !== -1) {
      this.submitVote();
    } else if (
      this.state.selected === -1 &&
      this.state.customVote.trim().length > 0 &&
      this.state.options.filter(option => {
        if (option.title === this.state.customVote.trim()) {
          return true;
        } else {
          return false;
        }
      }).length === 0
    ) {
      this.createOptionAndSubmit();
    } else {
      alert('Please select your choice');
    }
  }

  handleDeleteClick = () => {
    axios.delete(`/api/polls/${this.state.pollId}`, { headers: { authorization: localStorage.getItem('token') } })
      .then(res => this.props.history.goBack())
      .catch(err => console.log(err))
  }

  getBadgeColor = (color) => {
    this.setState({ badgeColor: color });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='col-sm-8'>
          <div className='jumbotron'>
            <h2>{this.state.title}</h2>
            <br />
            <div className='list-group'>
              {this.makeOptionsButtonList()}
            </div>
            <div className='btn-toolbar'>
              <button action='submit' className='btn btn-primary submit'>Submit</button>
              <a
                type='button'
                className='btn btn-secondary tweet'
                target='_blank'
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet?text=Vote your opinion on : ${this.state.title} at ${window.location.href}`}>
                Tweet
              </a>
              <button
                type='button'
                style={{ visibility: this.props.authenticated ? 'visible' : 'gone' }}
                onClick={this.handleDeleteClick}
                className='btn btn-danger pull-right delete'>
                Delete
              </button>
            </div>
          </div>
        </form>
        <div className='chart col-sm-4'>
          <Chart options={this.state.options} getBadgeColor={this.getBadgeColor} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(PollDetails);