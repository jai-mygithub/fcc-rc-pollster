import React, { Component } from 'react';

class NewPoll extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  formSubmit(e) {
    console.log(1);
    e.preventDefault();
    fetch('/api/newpoll', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Origin': '*'
      },
      body: JSON.stringify({ title: this.state.title })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit.bind(this)} action=''>
          <input type='text' name='title' onChange={event => this.setState({ title: event.target.value })} />
          <button type='submit' className='btn btn-default'>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewPoll;