import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Support } from '../_utils';
import $ from 'jquery';

import { userActions } from '../_actions';

class SupportPage extends React.Component {
    
    componentDidMount() {
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        return (
            <div className="">
                <Header  url={this.props} />
                <div className="col-12 no-padding">
                    
                    <div>
                        <Support />
                    </div>
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { support  } = state;
    return {
        support
    };
}

const connectedSupportPage = connect(mapStateToProps)(SupportPage);
export { connectedSupportPage as SupportPage };
