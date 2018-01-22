import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { EbayKey } from '../_utils';

import $ from 'jquery';


import { userActions } from '../_actions';

class EbayKeyPage extends React.Component {
    
    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });
    }

    componentDidMount(){
        this.props.dispatch(userActions.countryList());
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        const { country } = this.props;
        console.log(this.props);
        return (
            <div>
                {country.items &&
                <div>
                    <Header/>
                    <EbayKey />
                </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { card, country } = state;
    return {
        card,
        country
    };
}

const connectedEbayKeyPage = connect(mapStateToProps)(EbayKeyPage);
export { connectedEbayKeyPage as EbayKeyPage };