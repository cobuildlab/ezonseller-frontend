import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
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
        const { logginIn } = this.props;
        return (
            <div>
                
                <div>
                    <Header  url={this.props}/>
                    <EbayKey />
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

const connectedEbayKeyPage = connect(mapStateToProps)(EbayKeyPage);
export { connectedEbayKeyPage as EbayKeyPage };