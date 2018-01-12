import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { ProfilePage } from '../ProfilePage';
import { EditProfilePage } from '../EditProfilePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ForgotPage } from '../ForgotPage';
import { ChangePasswordPage } from '../ChangePasswordPage';
import { TermsPage } from '../TermsPage';
import { Footer } from '../Footer';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="container-fluid">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div className="row justify-content-md-center">
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/profile" component={ProfilePage} />
                        <PrivateRoute exact path="/edit-profile/:id" component={EditProfilePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/forgot" component={ForgotPage} />
                        <Route path="/change" component={ChangePasswordPage} />
                        <Route path="/terms" component={TermsPage} />
                    </div>
                </Router>
                <div className="text-center">
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
