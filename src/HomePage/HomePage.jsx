import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { history } from '../_helpers';
import './Home.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          search: {}
        };
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        this.props.dispatch(userActions.lastSearch());   
    }


    render() {
        const { search } = this.props;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { search } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        search
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
