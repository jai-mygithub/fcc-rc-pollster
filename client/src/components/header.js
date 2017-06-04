import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  renderLinks() {
    if (this.props.authenticated) {
      return (
        [
          <li key={2} className='nav-item'>
            <Link className='nav-link' to='/newpoll' >New Poll</Link>
          </li>,
          <li key={5} className='nav-item'>
            <Link className='nav-link' to='/mypolls' >My Polls</Link>
          </li>,
          <li key={6} className='dropdown'>
            <img id='user-pic' alt='user' src={localStorage.getItem('photo')} className='dropdown-toggle thumbnail' type='menu' data-toggle='dropdown' />
            <ul key={7} className='dropdown-menu'>
              <li key={4} className='nav-item'>
                <Link className='nav-link' to='/signout' >Sign out</Link>
              </li>
            </ul>
          </li>
        ]
      )
    } else {
      return (
        [
          <li key={3} className='nav-item' >
            <a className='nav-link' href='/api/signin/twitter' >Sign in with twitter</a>
          </li >
        ]
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container navbar-div-container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">FCC Pollster</Link>
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

export default connect(mapStateToProps)(Header);