import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AmazonKey } from '../_utils';

import $ from 'jquery';


import { userActions } from '../_actions';

class AmazonKeyPage extends React.Component {
    
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
                <AmazonKey />
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

const connectedAmazonKeyPage = connect(mapStateToProps)(AmazonKeyPage);
export { connectedAmazonKeyPage as AmazonKeyPage };