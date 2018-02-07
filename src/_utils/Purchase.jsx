import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import { userActions } from '../_actions';

class Purchase extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                purchase: {},
                submitted: false
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);        
    }

    componentDidMount() {
        let valueUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getUserId(valueUser.id));
        this.props.dispatch(userActions.paymentPlans());
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { purchase } = this.state;

        this.setState({
            purchase: {
                ...purchase,
                [name]: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { purchase } = this.state;
        const { dispatch } = this.props;
        if (purchase.terms && purchase.id_card) {
            purchase.id_plan   = this.props.params;
            purchase.automatic = "False";
            purchase.accept    = "True";
            $().ready(function() {
                $(".fakeloader").show();
            });
            dispatch(userActions.acquirePlan(purchase));
        }
    }

    render() {
        const { user, paymentsPlans } = this.props;
        const { purchase, submitted } = this.state;
        return (
            <div className="">
                <form name="form" id="myFormPurchasePlan" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="col-md-10 content-edit col-center">
                        <h2 className="text-center">Plan</h2>
                    {user.items &&
                    <div>
                        <div className={'form-group' + (submitted && !purchase ? ' has-danger' : '')}>
                            <label htmlFor="credit_card">Credit Card</label>
                            <select className="form-control" name="id_card" onChange={this.handleChange} required>
                                <option>Select a Credit Card</option>
                                {user.items.credit_cards.map(option => {
                                    return <option value={option.id} key={option.id}>{option.first_name} {option.last_name} - {option.type_card}</option>
                                })}
                            </select>
                            {submitted && !purchase &&
                                <div className="form-control-feedback">Credit Card is required</div>
                            }
                        </div> 
                    </div>
                    }
                    {paymentsPlans.items &&
                        <div className="data-credit">
                            {paymentsPlans.items.map((payment, index) =>
                            <div key={payment.id}>
                                <h5><b>Name:</b> {payment.title}</h5>
                                <h5><b>Description:</b> <p className="text-justify">{payment.description}</p></h5>
                                <h5><b>Terms:</b> <p className="text-justify">{payment.terms}</p></h5>
                                <h5><b>Cost:</b> {payment.cost}$</h5>
                                <h5><b>Duration:</b> {payment.duration}</h5>
                            </div>
                        )}
                      </div>
                    }

                    <div className="form-check">
                        <label>
                            <input type="radio" name="terms" onChange={this.handleChange} value={purchase.terms} required /> <span className="label-text"> <Link to="/terms" className="btn btn-link term">I Accept the Terms and Conditions Ezonseller.</Link></span>
                        </label>
                    </div>
                    <button className="btn btn-primary">Purchase</button>
                    <Link to={"/profile/"} className="btn btn-danger">Cancel</Link>
                </div>
            </div>
            </form>
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

const connectedPurchase = connect(mapStateToProps)(Purchase);
export { connectedPurchase as Purchase };
