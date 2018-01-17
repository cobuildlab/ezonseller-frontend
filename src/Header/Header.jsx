import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'
import './header.css';

import { userActions } from '../_actions';

class Header extends React.Component {
    /*componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }*/

    render() {
        const { user, users } = this.props;
        return (
          <div className="container-fluid no-padding">
            <nav className="navbar navbar-toggleable-md navbar-light fixed-top bg-faded shadow-nav">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img src={Logo} className="logo-nav center-block img-responsive" alt="" />
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <select className="custom-select rigth-input tam-input-nav">
                    <option selected>Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </li>
                <li className="nav-item">
                  <select className="custom-select rigth-input tam-input-nav">
                    <option selected>Category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </li>
                <li className="nav-item">
                  <form className="form-inline">
                      <div className="form-group">
                        <label for="inputPassword2" className="sr-only">Password</label>
                        <input type="text" className="form-control rigth-input tam-input-nav" id="inputPassword2" placeholder="Keywords"/>
                        <button type="submit" className="btn btn-primary">Search</button>
                      </div>

                  </form>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <div className="dropdown">
                    <div className="avatar-nav"></div>
                    <button className="btn btn-link dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </button>
                    <div className="dropdown-menu pos-menu" aria-labelledby="dropdownMenuButton">
                      <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                      <Link to="/profile" className="nav-link">Profile</Link>
                        <Link to="/login" className="nav-link">Logout</Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>

          </div>

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };
