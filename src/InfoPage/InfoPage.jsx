import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import './Info.css';
import  Card  from '../assets/card.png';
import  Pay  from '../assets/pay.png';
import  Amazon  from '../assets/amazon.png';
import  Ebay from '../assets/ebay.png';
import  Logo from '../assets/logo.png';
import $ from 'jquery';

class InfoPage extends React.Component {

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
    }


    render() {
        return (
            <div>
                <Header url={this.props} />
                <div className="container">

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

const connectedInfoPage = connect(mapStateToProps)(InfoPage);
export { connectedInfoPage as InfoPage };
