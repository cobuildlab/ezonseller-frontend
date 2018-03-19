import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import './Home.css';
import  Card  from '../assets/card.png';
import  Pay  from '../assets/pay.png';
import  Amazon  from '../assets/amazon.png';
import  Ebay from '../assets/ebay.png';
import  Logo from '../assets/logo.png';
import  Camazon from '../assets/capt-amazon.png';
import  Cebay from '../assets/capt-ebay.png';
import $ from 'jquery';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          search: {},
          plan: ""
        };
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        let value = JSON.parse(localStorage.getItem('user'));
        this.setState({ plan: value.type_plan })
        if(value.type_plan !== 'Free'){
            this.props.dispatch(userActions.lastSearch());
        }
    }


    render() {
        const { home } = this.props;
        const { plan } = this.state;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">
                    {plan === 'Free' &&
                    <div className="row">
                      <div className="col-12">
                        <h1 className="text-center title">Welcome to our <img src={ Logo } className="align-self-center logo img-fluid ml-2 mr-2" alt="info"/> system.</h1>
                      <h4 className="text-center sub-title">In order to enjoy the services we offer you, you must follow the following steps:</h4>
                        <div className="media d-flex align-items-center">
                          <img src={ Card } className="align-self-center mr-3" width="115" alt="info"/>
                        <div className="media-body text-infor">
                            Register your credit card by entering your profile and place the information requested.
                          </div>
                        </div>
                        <div className="media d-flex align-items-center">
                          <img src={ Pay } className="align-self-center mr-3" width="115" alt="info"/>
                          <div className="media-body text-infor">
                              Make the payment of the plan of your preference through the option purchase plan and follow the instructions.
                          </div>
                        </div>
                        <div className="media">
                          <img src={ Amazon } className=" mr-3" width="115" alt="info"/>
                          <div className="media-body text-infor">
                              Proceed to register your Amazon key, if you do not have one you should go to the following link: <a href="https://affiliate-program.amazon.com" target="_blank">https://affiliate-program.amazon.com</a>

                          </div>
                        </div>
                        <div className="media">
                          <img src={ Ebay } className=" mr-3" width="115" alt="info"/>
                          <div className="media-body text-infor">
                              Proceed to register your ebay key, if you do not have one you must enter the following link: <a href="https://go.developer.ebay.com/" target="_blank">https://go.developer.ebay.com/</a>

                          </div>
                        </div>
                      </div>
                    </div>

                    }
                    {home.items && plan !== 'Free' &&
                        <div className="row">
                        <h1>Last Searches</h1>
                        {home.items.length > 2 &&
                            <div className="row">
                                {home.items.slice(0, 12).map((item, index) =>
                                    <div key={index} className="col-md-4 col-xs-12">
                                    <div className="card height-card">
                                        <div className="card-img-top" style= {
                                                        { 'backgroundImage': 'url( ' + item.large_image_url + ')',
                                                          'backgroundRepeat': 'no-repeat',
                                                          'backgroundPosition': 'center',
                                                          'backgroundSize': 'contain',
                                                          'width': '100%',
                                                          'height': '250px',
                                                          }
                                                        } >
                                        </div>
                                        <div className="card-body">
                                        <h4 className="card-title title-title">{item.title}</h4>
                                        <p>Asin: {item.asin}</p>
                                        <p>Price: {item.price_and_currency}</p>
                                         <footer className="footer">
                                           <a className="btn btn-link" href={item.detail_page_url} target="_blank">Amazon</a>
                                           <a className="btn btn-link" href={'https://camelcamelcamel.com/' + item.title + '/product/' +  item.asin} target="_blank">Camel Camel Camel</a>
                                         </footer>
                                        </div>
                                    </div>
                                    </div>
                                )}
                            </div>
                        }
                        </div>
                    }
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { home } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        home
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
