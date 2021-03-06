import React from 'react';
import { Router, Route ,Switch, } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { ProfilePage } from '../ProfilePage';
import { EditProfilePage } from '../EditProfilePage';
import { EditPasswordPage } from '../EditPasswordPage';
import { PaymentCardPage } from '../PaymentCardPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ForgotPage } from '../ForgotPage';
import { ChangePasswordPage } from '../ChangePasswordPage';
import { TermsPage } from '../TermsPage';
import { PurchasePlanPage } from '../PurchasePlanPage';
import { CancelSuscriptionPage } from '../CancelSuscriptionPage';
import { AmazonKeyPage } from '../AmazonKeyPage';
import { EbayKeyPage } from '../EbayKeyPage';
import { SharePage } from '../SharePage';
import { ActivatePage } from '../ActivatePage';
import { ShowPage } from '../ShowPage';
import { SupportPage } from '../SupportPage';
import { EditCreditCard } from '../EditCreditCard';
import { PaymentHistoryPage } from '../PaymentHistoryPage';
import { InfoPage } from '../InfoPage';
import { DetailsPlanPage } from '../PlanDetailsPage';
import { NotFound } from '../NotFound';

import { ToastContainer } from 'react-toastify';

import IdleTimer from 'react-idle-timer';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: 300000,
            remaining: null,
            isIdle: false,
            lastActive: null,
            elapsed: null
        };

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    _onActive = () => {
        this.setState({ isIdle: false });
    };

    _onIdle = () => {
        this.setState({ isIdle: true });
        if(localStorage.getItem('user')){
            history.push('login');
        }
    };

    render() {
        return (
            <div className="container top-section">
                <IdleTimer
                    ref="idleTimer"
                    element={document}
                    activeAction={this._onActive}
                    idleAction={this._onIdle}
                    timeout={this.state.timeout}
                    format="MM-DD-YYYY HH:MM:ss.SSS">
                </IdleTimer>
                <ToastContainer autoClose={6000} />
                <Router history={history}>
                    <div>
                        <Switch>
                        <PrivateRoute exact path="/" component={HomePage}  />
                        <PrivateRoute exact path="/profile" component={ProfilePage} />
                        <PrivateRoute exact path="/edit-profile/:id" component={EditProfilePage} />
                        <PrivateRoute exact path="/purchase-plan/:id" component={PurchasePlanPage} />
                        <PrivateRoute exact path="/cancel-plan/:id" component={CancelSuscriptionPage} />
                        <PrivateRoute exact path="/edit-password" component={EditPasswordPage} />
                        <PrivateRoute exact path="/credit-card" component={PaymentCardPage} />
                        <PrivateRoute exact path="/amazon-key" component={AmazonKeyPage} />
                        <PrivateRoute exact path="/ebay-key/" component={EbayKeyPage} />
                        <PrivateRoute exact path="/share/:country/:id" component={SharePage} />
                        <PrivateRoute exact path="/show/:country/:category/:keyword" component={ShowPage} />
                        <PrivateRoute exact path="/support" component={SupportPage} />
                        <PrivateRoute exact path="/edit-credit-card/:id" component={EditCreditCard} />
                        <PrivateRoute exact path="/payment-history/" component={PaymentHistoryPage} />

                        <Route path="/activate/:uidb64/:token" component={ActivatePage} />
                        <Route path="/login" refresh="true" component={LoginPage} />
                        <Route path="/register" refresh="true" component={RegisterPage} />
                        <Route path="/forgot" component={ForgotPage} />
                        <Route path="/change" component={ChangePasswordPage} />
                        <Route path="/terms" component={TermsPage} />
                        <Route path="/plan-details/:id" component={DetailsPlanPage} />
                        <Route path="/info" component={InfoPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    </div>
                </Router>
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
