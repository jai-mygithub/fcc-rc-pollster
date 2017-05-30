import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (
        [
          <li key={2} className='nav-item'>
            <a className='nav-link' href='/newpoll' >New Poll</a>
          </li>,
          <li key={5} className='nav-item'>
            <a className='nav-link' href='/mypolls' >My Polls</a>
          </li>,
          <li key={4} className='nav-item'>
            <a className='nav-link' href='/signout' >Sign out</a>
          </li>
        ]
      )
    } else {
      return (
        [
          < li key={3} className='nav-item' >
            <a className='nav-link' href='http://10.0.0.163:3000/api/signin/twitter' >Sign in with twitter</a>
          </li >
        ]
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">FCC Pollster</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li key={1} className='nav-item'><Link className='nav-link' to='/polls'>Home</Link></li>
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, null)(Header);