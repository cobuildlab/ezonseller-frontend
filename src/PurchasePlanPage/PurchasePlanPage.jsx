import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Purchase } from '../_utils';
import './PurchasePlanPage.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class PurchasePlanPage extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                purchase: {},
                submitted: false
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);        
    }

    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });
    }

    componentDidMount() {
        let valueUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getUserId(valueUser.id));
        this.props.dispatch(userActions.paymentPlans());
        $().ready(function() {
            $(".fakeloader").fadeOut();
         });
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
            purchase.id_plan   = this.props.match.params.id;
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
        return (
            <div className="">
                <Header url={this.props} />
                <Purchase user={user} paymentsPlans={paymentsPlans}  params={this.props.match.params.id} />
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

const connectedPurchasePlanPage = connect(mapStateToProps)(PurchasePlanPage);
export { connectedPurchasePlanPage as PurchasePlanPage };
