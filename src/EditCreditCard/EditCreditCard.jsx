import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { CreditCardEdit } from '../_utils';
import { userActions } from '../_actions';

import $ from 'jquery';

class EditCreditCard extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentWillMount() {
        $().ready(function() {
            $(".fakeloader").show();
        });
    }

    componentWillMount(){
        this.props.dispatch(userActions.detailCreditCard(this.props.match.params.id));
    }

    componentDidMount() {
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        const { card } = this.props;
        return (
            <div className="">
                <Header url={this.props} />
                <CreditCardEdit />
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

const connectedEditCreditCard = connect(mapStateToProps)(EditCreditCard);
export { connectedEditCreditCard as EditCreditCard };