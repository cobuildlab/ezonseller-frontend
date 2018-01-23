import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import Logo from '../assets/logo.png'
import $ from 'jquery';

import { userActions } from '../_actions';

class ActivatePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (nextProps) =>{
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        history.push('/profile')
    };

    componentWillMount() {
       this.props.dispatch(userActions.activateAccount(this.props.match.params))
    }

    render() {
        const { loggingIn } = this.props;
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
