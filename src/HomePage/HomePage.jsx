import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { history } from '../_helpers';
import './Home.css';
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
        localStorage.setItem('product', JSON.stringify(data));
        history.push('/share/' + data.asin);
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.search.items){
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });
        }
    };

    render() {
        const { search } = this.props;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">
                    <h1>Search for result</h1>
                        {search.items &&
                            <div className="row">
                            {search.items.length > 2 &&
                                <div className="row">
                                    {search.items.slice(0, 10).map((item, index) =>
                                        <div key={index} className="col-md-4 col-xs-12">
                                        <div className="card height-card">
                                            <img className="card-img-top" src={item.large_image_url} height="250" alt={item.title} />
                                            <div className="card-body">
                                            <h4 className="card-title title-title">{item.title}</h4>
                                            <p>Asin: {item.asin}</p>
                                            <p>Price: {item.price_and_currency}</p>
                                             <footer class="footer">
                                               <a className="btn btn-link" href={item.detail_page_url} target="_blank">Amazon</a>
                                               <a className="btn btn-link" href={'https://camelcamelcamel.com/' + item.title + '/product/' +  item.asin} target="_blank">Camel Camel Camel</a>
                                               <button className="btn btn-primary btn-block top-btn" onClick={this.handleSaveProduct.bind(this, item)}>Share Ebay</button>
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
    const { search } = state;
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        search
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
