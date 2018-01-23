import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'
import './forgot.css';
import '../index.css';
import $ from 'jquery';


import { userActions } from '../_actions';

class ForgotPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            submitted: false,
            render: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        setTimeout(function(){ 
            this.setState({render: true})
        }.bind(this), 10); 
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email } = this.state;
        const { dispatch } = this.props;

        $().ready(function() {
            var value =  $("#forgot_form").val();
            if(value) {
                dispatch(userActions.recoveryPassword({"email":email}));
            }     
        });
    }

    render() {
        if(this.state.render){
            const { loggingIn } = this.props;
            const { email } = this.state;
            return (
            <div className="col-md-12">
                <img src={Logo} className="logo-img center-block img-responsive" alt="" />
                <div className="row top d-flex justify-content-center">
                    <div className="col-md-6 section-forgot">
                        <h1>Forgot Password?</h1>
                        <p>Enter your email shorly we will send you an email with access code </p>
                        <form name="forgotForm" id="forgotForm" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Email</label>
                                <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} required />
                                <input type="hidden" name="forgot_form" id="forgot_form" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Recovery Password</button>
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
        }else{
            return (<div className="backgroud-body"></div>);
        }
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedForgotPage = connect(mapStateToProps)(ForgotPage);
export { connectedForgotPage as ForgotPage };
