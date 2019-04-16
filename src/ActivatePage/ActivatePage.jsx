import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import $ from 'jquery';

import { userActions } from '../_actions';

class ActivatePage extends React.Component {

    componentWillReceiveProps = (nextProps) =>{
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        history.push('/profile')
        console.log(nextProps)
    };

    componentWillMount() {
        console.log(this.props.match.params)
       this.props.dispatch(userActions.activateAccount(this.props.match.params))
    }

    render() {
        return (
            <div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedActivatePage = connect(mapStateToProps)(ActivatePage);
export { connectedActivatePage as ActivatePage };
