import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';

import $ from 'jquery';

import { userActions } from '../_actions';

class SharePage extends React.Component {
    
    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });
    }

    componentDidMount(){
        let objectProduct = JSON.parse(localStorage.getItem('product'));
        this.props.dispatch(userActions.getProductEbay(objectProduct.asin));
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        const { logginIn } = this.props;
        const { search } = this.props.state;
        let objectProduct = JSON.parse(localStorage.getItem('product'));
        return (
            <div className="">
                {search.items &&
                <div className="col-12 section-data">
                    <div className="row">
                        <div className="col-12">
                            <div className="content-data">
                            {search.items.slice(0, 1).map((item, index) =>
                                <div>
                                    <img src={item.galleryURL} alt="product ebay" />
                                    <h3>{item.title}</h3>
                                    <h5>{item.location}</h5>
                                    <h5>{item.country}</h5>
                                    <h5>{item.itemId}</h5>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                }
                <div className="col-12 section-data">
                    <div className="row">
                        <div className="col-12">
                            <div className="content-data">
                                <img src={objectProduct.large_image_url} alt="product ebay" />
                                <h3>{objectProduct.title}</h3>
                                <h5>{objectProduct.asin}</h5>
                                <h5>{objectProduct.country}</h5>
                                <h5>{objectProduct.price_and_currency}</h5>
                            </div>
                        </div>
                    </div>
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
        state
    };
}

const connectedSharePage = connect(mapStateToProps)(SharePage);
export { connectedSharePage as SharePage };