import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { PaymentCard } from '../_utils';

import $ from 'jquery';

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