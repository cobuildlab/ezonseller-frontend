import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import '../HomePage/Home.css';
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
        this.props.dispatch(userActions.getProductEbay(objectProduct.title));
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        const { ebay } = this.props;
        console.log();
        let objectProduct = JSON.parse(localStorage.getItem('product'));
        return (
            <div>
                <Header url={this.props} />
                
                    <div className="col-12 section-data">
                        <div className="row">
                            <div className="col-12 section-data">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="content-data">
                                        <h2>By Amazon Result</h2>
                                        <div className="col-md-4 col-xs-12 no-padding">
                                            <div className="card height-card">
                                            <img className="card-img-top" height="250" src={objectProduct.large_image_url} alt="product ebay"/>
                                            <div className="card-body">
                                                <h3 className="card-title title-title">{objectProduct.title}</h3>
                                                <h5>{objectProduct.asin}</h5>
                                                <h5>{objectProduct.country}</h5>
                                                <h5>{objectProduct.price_and_currency}</h5>
                                            </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                            {ebay.items &&        
                                <div className="content-data">
                                    <h2>By Ebay Result</h2>
                                    {ebay.items.slice(0, 5).map((item, index) =>
                                        <div key={index} className="col-md-4 col-xs-12 no-padding">
                                            <div className="card height-card">
                                                <img className="card-img-top" height="250" src={item.galleryURL} alt="product ebay"/>
                                                <div className="card-body">
                                                    <h3 className="card-title title-title">{item.title}</h3>
                                                    <h5>{item.location}</h5>
                                                    <h5>{item.country}</h5>
                                                    <h5>{item.itemId}</h5>
                                                    <h5>{item.sellingStatus.currency} {item.sellingStatus.values}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            } 
                            </div>
                        </div>
                </div>
                  
        </div>
        );
    }
}

function mapStateToProps(state) {
    const { ebay } = state;
    return {
        ebay
    };
}

const connectedSharePage = connect(mapStateToProps)(SharePage);
export { connectedSharePage as SharePage };
