import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'

import { userActions } from '../_actions';

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            code: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { code, password } = this.state;
        const { dispatch } = this.props;
        if (code && password) {
            dispatch(userActions.changePassword({"code": code, "password": password}));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { code, password, submitted } = this.state;
        return (
          <div className="col-md-12">
            <img src={Logo} className="logo-img center-block img-responsive" alt="" />
            <div className="row top d-flex justify-content-center">
              <div className="col-md-6 section-register">
                  <h2>Change Password</h2>
                  <form name="form" id="formChangePassword" onSubmit={this.handleSubmit}>
                      <div  className="form-group">
                          <label htmlFor="username">Code</label>
                          <input type="text" className="form-control" name="code" value={code} onChange={this.handleChange} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="password">New Password</label>
                          <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                          <input type="hidden" name="changePassword_form" id="changePassword_form" />
                      </div>
                      <div className="form-group">
                          <button className="btn btn-primary">Change</button>
                          {loggingIn &&
                              <img alt="logo" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                          }
                          <Link to="/login" className="btn btn-danger">Cancel</Link>
                      </div>
                  </form>
              </div>
            </div>
          </div>

        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(ChangePasswordPage);
export { connectedLoginPage as ChangePasswordPage };
