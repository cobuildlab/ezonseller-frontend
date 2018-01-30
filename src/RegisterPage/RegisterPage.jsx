import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'
import './register.css';
import '../index.css';
import $ from 'jquery';
import Recaptcha from 'react-grecaptcha';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        let callback;
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: '',
                terms: '',
                register_form: ''
            },
            response: {},
            submitted: false,
            invalid: false,
            render: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        setTimeout(function(){
            //this.setState({render: true})
        }.bind(this), 10);
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

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    onChange(response) {
        this.setState({
            'response': response
        });
        console.log(response);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, response } = this.state;
        const { dispatch } = this.props;
        let callback;
        if (user.first_name && user.last_name && user.username && user.password && user.email && user.terms) {
            $().ready(function() {
                var value =  $("#register_form").val();
                if(value) {
                    user.callback = response;
                    dispatch(userActions.register(user));
                }
            });
        }
    }

    onChange(response) {
        console.log(response);
        this.setState({
            'g-recaptcha-response': response
        });
    }


    render(){
            const { registering  } = this.props;
            const { user } = this.state;
            
            const verifyCallback = response =>  {
                console.log(response);
                console.log(typeof(response));

                if(typeof(response) == string){
                    localStorage.setItem('callback', JSON.stringify(verifyCallback));
                }
                return response
            };
            const expiredCallback = () => console.log('expired');

            return (

            <div className="col-md-12 no-padding">
                <img src={Logo} className="logo-img center-block img-fluid" alt="" />
                <div className="row top d-flex justify-content-center">
                <div className="col-md-8 col-10 section-register">
                    <h2 className="bottom-title">Register</h2>
                    <form name="form" id="commentForm" onSubmit={this.handleSubmit}>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control rigth-input" name="first_name" value={user.first_name} onChange={this.handleChange} required />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={this.handleChange} required />

                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control rigth-input" name="username" value={user.username} onChange={this.handleChange} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} required />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={this.handleChange} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" className="form-control" name="confirm_password" value={user.confirm_password} onChange={this.handleChange} required />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className='form-group'>
                                <div className="row">
                                    <div className="col-md-12 no-padding">
                                    <input type="radio" className="" name="terms" onChange={this.handleChange} required />
                                    <input type="hidden" name="register_form" id="register_form" value={user.register_form} />
                                     <Link to="/terms"  target="_blank" className="btn btn-link term">I Accept the Terms and Conditions Ezonseller.</Link>
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="Col">
                          <Recaptcha
                            sitekey='6LejRUMUAAAAAEmqctY7MvmGQ3_AAvKcuvYKBU0x'
                            callback={verifyCallback}
                            expiredCallback={expiredCallback}
                            locale="gb-EN"
                            className="customClassName"

                            // Other props will be passed into the component.
                            data-theme=""
                            onChange={this.onChange.bind(this)}
                            />
 
                          </div>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <button className="btn btn-primary" id="create_account">Create Account</button>
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="logo" />
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
