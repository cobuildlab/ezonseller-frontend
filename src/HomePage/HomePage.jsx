import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { history } from '../_helpers';
import './Home.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          search: {}
        };
    }

    componentDidMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        this.props.dispatch(userActions.lastSearch());   
    }


    render() {
        const { home } = this.props;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">
                    {home.items &&
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
