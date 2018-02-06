import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { history } from '../_helpers';
import $ from 'jquery';

import { userActions } from '../_actions';


class ShowPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          search: {}
        };

        this.handleSaveProduct = this.handleSaveProduct.bind(this);
    }

    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
            console.log(1);
        });
        this.props.dispatch(userActions.getSearch(this.props.match.params))
    }

    handleSaveProduct(data) {
        localStorage.setItem('product', JSON.stringify(data));
        history.push('/share/' + this.props.match.params.country + '/' + data.title);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.search.items){
            console.log(nextProps.search.items);
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
                                <div className="row">
                                    {search.items.slice(0, search.items.length-1).map((item, index) =>
                                        <div key={index} className="col-md-4 col-xs-12">
                                        <div className="card height-card">
                                          <div className="card-img-top" style={
                                                      {  'backgroundImage': 'url( ' + item.large_image_url + ')',
                                                        'backgroundRepeat': 'no-repeat',
                                                        'backgroundPosition': 'center',
                                                        'backgroundSize': 'contain',
                                                        'width': '100%',
                                                        'height': '250px',
                                                      }
                                                    } ></div>
                                            <div className="card-body">
                                            <h4 className="card-title title-title">{item.title}</h4>
                                            <p>Asin: {item.asin}</p>
                                            <p>Price: {item.price_and_currency}</p>
                                             <footer className="footer">
                                               <a className="btn btn-link" href={item.detail_page_url} target="_blank">Amazon</a>
                                               <a className="btn btn-link" href={'https://camelcamelcamel.com/' + item.title + '/product/' +  item.asin} target="_blank">Camel Camel Camel</a>
                                               <button className="btn btn-primary btn-block top-btn" onClick={this.handleSaveProduct.bind(this, item)}>Share Ebay</button>
                                             </footer>
                                            </div>
                                        </div>
                                        </div>
                                    )}
                                </div>
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

const connectedShowPage = connect(mapStateToProps)(ShowPage);
export { connectedShowPage as ShowPage };
