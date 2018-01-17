import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import './profile.css';


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
                {user.items &&
                  <div className="col-12 section-data">
                    <div className="row">
                    <div className="col-12">
                      <div className="avatar-profile"></div>
                      <div className="content-data">
                        <h3>{user.items.first_name} {user.items.last_name}</h3>
                        <h5>{user.items.username}</h5>
                        <h5>{user.items.email}</h5>
                      </div>
                      <div className="btn-group-vertical btn-opt">
                        <Link to={"/edit-profile/" + valueUser.id} className="btn btn-primary btn-top">Edit Profile</Link>
                        <Link to={"/edit-password/"} className="btn btn-primary">Change Password</Link>
                      </div>
                    </div>
                  </div>
                </div>
                }
                <div className="col-12 no-padding">
                    <h2>Credit Card <Link to={"/credit-card/"} className="btn btn-primary rigth-input rigth-add">Add Credit Card</Link></h2>
                    {user.items &&
                        <div className="data-credit">
                            {user.items.credit_cards.map((credit, index) =>
                            <div key={credit.id}>
                                <h5>{credit.name}</h5>
                                <h5>{credit.number_card}</h5>
                                <h5>{credit.date_expiration}</h5>
                                <Link to={"/credit-card/"} className="btn btn-primary rigth-input">Select Credit Card</Link>
                                <button className="btn btn-danger" onClick={this.handleAcquirePlan}>Delete Credit Card</button>
                            </div>

                        )}

                        </div>


                    }

                </div>

                <div className="col-12 no-padding">
                    <h2>Plans <button className="btn btn-primary rigth-add" onClick={this.handleAcquirePlan}>Adquire Plan</button></h2>
                    {paymentsPlans.items &&
                        <div className="data-credit">
                            {paymentsPlans.items.map((payment, index) =>
                            <div  key={payment.id}>
                                <h5>{payment.title}</h5>
                                <h5>{payment.description}</h5>
                                <h5>{payment.terms}</h5>
                                <button className="btn btn-danger" onClick={this.handleAcquirePlan}>Cancel Plan</button>
                            </div>
                        )}
                      </div>
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
