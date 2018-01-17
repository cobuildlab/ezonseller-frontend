import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-validify'
import { required, email } from 'redux-form-validators'

import { userActions } from '../_actions';
import SyncValidation from './SyncValidation';

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
            submitted: false
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
        console.log(1)
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.first_name && user.last_name && user.username && user.password && user.email && user.terms) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <SyncValidation onSubmit={this.handleSubmit} />
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

const connectedshowResult = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
