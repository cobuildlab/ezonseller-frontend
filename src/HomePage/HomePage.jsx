import React from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from '../_components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';

class HomePage extends React.Component {
    
    render() {

        return (
            <div>
                <Header />
                <div className="container">
                <h1>Home</h1>
                </div>    
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };