import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { history } from '../_helpers';

import $ from 'jquery';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          search: {}
        };

        this.handleSaveProduct = this.handleSaveProduct.bind(this);
    }

    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    handleSaveProduct(data){
        console.log(data);
        localStorage.setItem('product', JSON.stringify(data));
        history.push('/share/' + data.asin);
    }

    render() {
        const { search } = this.props;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">
                    <h1>Home</h1>
                    <div className="row">
                        {search.items &&
                            <div className="row">
                                {search.items.slice(0, 9).map((item, index) =>
                                    <div key={index} className="col-3">
                                      <div className="card">
                                        <img className="card-img-top" src={item.large_image_url} height="250" alt={item.title} />
                                        <div className="card-body">
                                          <h5 className="card-title">Name: {item.title}</h5>
                                          <h5>Asin: {item.asin}</h5>
                                          <h5>Availability: {item.availability}</h5>
                                          <a href={item.detail_page_url} target="_blank">Amazon</a>
                                          <a href={'https://camelcamelcamel.com/' + item.title + '/product/' +  item.asin} target="_blank">Camel Camel Camel</a>
                                          <button className="btn btn-danger" onClick={this.handleSaveProduct.bind(this, item)}>Share Ebay</button>
                                        </div>
                                      </div>
                                    </div>
                                )}
                            </div>
                        }
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
        search
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
