import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../assets/logo.png'
import './register.css';
import '../index.css';
import $ from 'jquery';
import Recaptcha from 'react-grecaptcha';
import {toast} from 'react-toastify';
import {userService} from '../_services'

import {userActions} from '../_actions';

class NotFound extends React.Component {


    componentDidMount() {
        $().ready(function () {
            $(".fakeloader").fadeOut();
        });
    }

    render() {


        return (
            <h1>404 NOT FOUND</h1>
        );

    }
}

function mapStateToProps(state) {

}

const connectedNotFound = connect(mapStateToProps)(NotFound);
export {connectedNotFound as NotFound};
