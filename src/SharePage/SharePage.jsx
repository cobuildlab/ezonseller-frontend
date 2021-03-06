import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import '../HomePage/Home.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class SharePage extends React.Component {

    constructor(props) {
        super(props);
    
        this.goBack = this.goBack.bind(this)
      }

    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });

    }

    componentDidMount(){
        this.props.dispatch(userActions.getProductEbay(this.props.match.params.country, this.props.match.params.id));
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.ebay.items){
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });
        }
    };

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const { ebay } = this.props;
        let objectProduct = JSON.parse(localStorage.getItem('product'));
        return (
            <div>
                <Header url={this.props} />

                    <div className="col-12">
                    <button onClick={this.goBack} className="btn btn-primary rigth-input rigth-add">Back</button>

                    {ebay.items &&

                        <div className="row">
                          <div className="col-md-12 section-data">
                              <div>
                              <h2>By Amazon Result</h2>
                              <div className="col-md-4 col-xs-12">
                                  <div className="card height-card">
                                    <div className="card-img-top" style={
                                                {  'backgroundImage': 'url( ' + objectProduct.large_image_url + ')',
                                                  'backgroundRepeat': 'no-repeat',
                                                  'backgroundPosition': 'center',
                                                  'backgroundSize': 'contain',
                                                  'width': '100%',
                                                  'height': '250px',
                                                }
                                              } ></div>
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
                        
                          <div className="col-12">
                            <h2>By Ebay Result</h2>
                          </div>
                            {ebay.items.slice(0, ebay.items.length-1).map((item, index) =>

                                  <div key={index} className="col-md-4">
                                      <div className="card height-card">
                                        <div className="card-img-top" style={
                                            {  'backgroundImage': 'url( ' + item.galleryURL + ')',
                                              'backgroundRepeat': 'no-repeat',
                                              'backgroundPosition': 'center',
                                              'backgroundSize': 'contain',
                                              'width': '100%',
                                              'height': '250px',
                                            }
                                          } ></div>
                                          <div className="card-body">
                                              <h3 className="card-title title-title">{item.title}</h3>
                                              <h5>{item.location}</h5>
                                              <h5>{item.country}</h5>
                                              <h5>{item.itemId}</h5>
                                              <h5>{item.sellingStatus}</h5>
                                              <a href={item.viewItemURL} target="_blank">Ebay</a>
                                          </div>
                                      </div>
                                  </div>

                                )}
                            
                        </div>
                          
                    }
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
