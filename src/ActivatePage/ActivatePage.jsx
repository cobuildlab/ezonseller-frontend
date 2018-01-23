import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logo  from '../assets/logo.png'
import $ from 'jquery';

import { userActions } from '../_actions';

class ActivatePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(1);
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    componentWillMount() {
       this.props.dispatch(userActions.activateAccount(this.props.match.params))
    }

    render() {
        const { loggingIn } = this.props;
        return (
            <div className="col-md-12">
                <h1>Hola</h1>
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
