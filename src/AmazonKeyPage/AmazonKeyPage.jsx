import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
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
        this.props.dispatch(userActions.countryList());
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        const { countrys } = this.props;
        console.log(this.props);
        return (
            <div>
                <Header url={this.props} />
                {countrys.items &&
                <div>
                    <AmazonKey countrys={countrys.items} />
                </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { countrys } = state;
    return {
        countrys
    };
}

const connectedAmazonKeyPage = connect(mapStateToProps)(AmazonKeyPage);
export { connectedAmazonKeyPage as AmazonKeyPage };