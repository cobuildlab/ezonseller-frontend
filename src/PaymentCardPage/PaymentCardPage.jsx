import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { PaymentCard } from '../_utils';

import $ from 'jquery';


import { userActions } from '../_actions';

class PaymentCardPage extends React.Component {
    
    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {

        return (
            <div className="">
                <Header/>
                <PaymentCard  url={this.props} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { card } = state;
    return {
        card
    };
}

const connectedPaymentCardPage= connect(mapStateToProps)(PaymentCardPage);
export { connectedPaymentCardPage as PaymentCardPage };