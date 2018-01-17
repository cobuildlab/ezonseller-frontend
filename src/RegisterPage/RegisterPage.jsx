import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'
import './register.css';
import '../index.css';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: '',
                terms: ''
            },
            submitted: false,
            invalid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, error } = this.state;
        const { dispatch } = this.props;
        var regex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;

        if (user.first_name && user.last_name && user.username && user.password && user.email && user.terms) {
            if(regex.test(user.email)){
                console.log('is Valid');
            }else{
                this.setState({
                    invalid: true
                });
                console.log('is inValid');
            }
            //dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, invalid } = this.state;
        console.log(this.state);
        return (
          <div className="col-md-12">
            <img src={Logo} className="logo-img center-block img-responsive" alt="" />
            <div className="row top d-flex justify-content-center">
              <div className="col-md-6 section-register">
                  <h2>Register</h2>
                  <form name="form" onSubmit={this.handleSubmit}>

                      <div className={'form-group' + (submitted && !user.first_name ? ' has-danger' : '')}>
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={this.handleChange} />
                          {submitted && !user.first_name &&
                              <div className="form-control-feedback">First Name is required</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.last_name ? ' has-danger' : '')}>
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={this.handleChange} />
                          {submitted && !user.last_name &&
                              <div className="form-control-feedback">Last Name is required</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.username ? ' has-danger' : '')}>
                          <label htmlFor="username">Username</label>
                          <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                          {submitted && !user.username &&
                              <div className="form-control-feedback">Username is required</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.email ? ' has-danger' : '')}>
                          <label htmlFor="username">Email</label>
                          <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                          {submitted && !user.email &&
                              <div className="form-control-feedback">Email is required</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.password ? ' has-danger' : '')}>
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                          {submitted && !user.password &&
                              <div className="form-control-feedback">Password is required</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.terms ? ' has-danger' : '')}>
                          <div className="row">
                            <div className="col-md-12">
                              <input type="radio" className="" name="terms" onChange={this.handleChange} />
                              <label htmlFor="terms"> <Link to="/terms" className="btn btn-link term">I Accept the Terms and Conditions Ezonseller.</Link></label>
                            </div>

                          </div>
                          {submitted && !user.terms &&
                              <div className="form-control-feedback">The Terms and Conditions is required</div>
                          }
                      </div>
                      <div className="form-group d-flex justify-content-center">
                          <button className="btn btn-primary ">Create Account</button>
                          {registering &&
                              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
    const { edit } = state.registration;
    return {
        edit
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
