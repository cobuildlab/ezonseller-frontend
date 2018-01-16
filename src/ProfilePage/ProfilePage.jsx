import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';


import { userActions } from '../_actions';

class ProfilePage extends React.Component {
    super(props){

        this.handleAcquirePlan = this.handleAcquirePlan.bind(this);
    }

    componentDidMount() {
        let valueUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getUserId(valueUser.id));
        this.props.dispatch(userActions.paymentPlans());
    }

    handleAcquirePlan(){
        console.log('Adquired');
    }

    render() {
        const { user, paymentsPlans } = this.props;
        let valueUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="">
                <Header/>
                <div className="container">
                <h1>Profile</h1>
                {user.items &&
                    <ul>
                        <li>{user.items.first_name}</li>
                        <li>{user.items.last_name}</li>
                        <li>{user.items.username}</li>
                        <li>{user.items.type_plan}</li>
                        <li>{user.items.email}</li>
                        <li>{user.items.photo}</li>
                    </ul>
                }
                <Link to={"/edit-profile/" + valueUser.id} className="">Edit Profile</Link>
                <Link to={"/edit-password/"} className="">Change Password</Link>
                <Link to={"/credit-card/"} className="">Add Credit Card</Link>

                </div>
                <div className="container">
                    <h1>Plan</h1>
                    {paymentsPlans.items &&
                        <ul>
                            {paymentsPlans.items.map((payment, index) =>
                            <li key={payment.id}>
                                <p>Title: {payment.title}</p>
                                <p>Description: {payment.description}</p>
                                <p>Terms: {payment.terms}</p>
                                <button className="btn btn-primary" onClick={this.handleAcquirePlan}>Acquire Plan</button>
                            </li>
                        )}
                        </ul>
                    }
                </div>
                <div className="container">
                    <h1>Credit Card</h1>
                    {user.items &&
                        <ul>
                            {user.items.credit_cards.map((credit, index) =>
                            <li key={credit.id}>
                                <p>Title: {credit.name}</p>
                                <p>Description: {credit.number_card}</p>
                                <p>Terms: {credit.date_expiration}</p>
                                <button className="btn btn-primary" onClick={this.handleAcquirePlan}>Delete Credit Card</button>
                            </li>
                        )}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, paymentsPlans } = state;
    return {
        user,
        paymentsPlans
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
