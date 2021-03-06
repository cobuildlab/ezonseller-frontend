import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import $ from 'jquery';

import { userActions } from '../_actions';

class EditPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                old_password: '',
                new_password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
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
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.new_password && user.old_password) {
            $().ready(function() {
                var value =  $("#editPassword_form").val();
                if(value) {
                    dispatch(userActions.changePasswordEdit(user));
                }     
            });
        }
    }

    render() {
        const { registering  } = this.props;
        return (
            <div className="col-md-12">
                <Header  url={this.props}/>
                <h2 className="text-center">Change Password</h2>
                <div className="col-md-7 content-edit col-center">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <form name="form" id="formEditPassword" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input type="password" className="form-control" name="old_password" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" className="form-control" name="new_password" onChange={this.handleChange} required />
                                    <input type="hidden" name="editPassword_form" id="editPassword_form" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Change</button>
                                    {registering &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="logo" />
                                    }
                                    <Link to="/profile" className="btn btn-danger">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedEditPasswordPage = connect(mapStateToProps)(EditPasswordPage);
export { connectedEditPasswordPage as EditPasswordPage };