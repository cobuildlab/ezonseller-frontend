import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';

class Profile extends React.Component {

    super(props){
        this.handleDeleteCard  = this.handleDeleteCard.bind(this);
    }

    handleDeleteCard(data, e){
        this.props.dispatch(userActions.deleteCreditCard(data));
    }

    render() {
        const { user, paymentsPlans } = this.props;
        let valueUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="">
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
                                <Link to={"/edit-password/"} className="btn btn-primary btn-top">Change Password</Link>
                                <Link to={"/amazon-key/"} className="btn btn-primary btn-top">Add Amazon Key</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 no-padding">
                    <h2>Credit Card <Link to={"/credit-card/"} className="btn btn-primary rigth-input rigth-add">Add Credit Card</Link></h2>
                    {user.items &&
                    <div className="data-credit">
                        {user.items.credit_cards.map((credit, index) =>
                        <div key={credit.id}>
                            <h5>Name: {credit.name}</h5>
                            <h5>Credit Card Number: {credit.number_card}</h5>
                            <h5>Date Expiration: {credit.date_expiration}</h5>
                            <button role="button" className="btn btn-danger" onClick={this.handleDeleteCard.bind(this, credit.id)}>Delete Credit Card</button>
                        </div>
                            )}
                    </div>
                        }
                </div>

                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            {user.items.plan_subscription.length > 0 &&
                            <div className="data-credit">
                                <h2>Plan Purchase</h2>
                                <div className="col-12 no-padding">
                                    {user.items.plan_subscription.map((plan, index) =>
                                    <div key={plan.id}>
                                        <h5>Name: {plan.title}</h5>
                                        <h5>Description: {plan.description}</h5>
                                        <h5>Date Start: {new Date(plan.date_start).toDateString()}</h5>
                                        <h5>Date Finish: {new Date(plan.date_finish).toDateString()}</h5>
                                        <Link to={"/cancel-plan/" + user.items.id_plan} className="btn btn-danger">Cancel Plan</Link>
                                    </div>
                                        )}
                                </div>
                            </div>
                                }
                        </div>
                            }
                    </div>
                </div>

                <div className="col-12 no-padding">
                    <div>
                        {user.items &&
                        <div>
                            {user.items.plan_subscription.length == 0 &&
                            <div>
                                <h2>Plans</h2>
                                {paymentsPlans.items &&
                                <div className="data-credit">
                                    {paymentsPlans.items.map((payment, index) =>
                                    <div  key={payment.id}>
                                        <div>
                                            <Link to={"/acquire-plan/" + payment.id} className="btn btn-primary rigth-add">Acquire Plan</Link>
                                        </div>
                                        <h5>Name: {payment.title}</h5>
                                        <h5>Cost: {payment.cost}</h5>
                                    </div>
                                        )}
                                </div>
                                    }
                            </div>
                                }
                        </div>
                            }
                    </div>

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

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile };
