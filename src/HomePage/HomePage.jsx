import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import $ from 'jquery';

class HomePage extends React.Component {
    
    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

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