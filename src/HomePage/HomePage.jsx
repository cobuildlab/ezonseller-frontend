import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import $ from 'jquery';

class HomePage extends React.Component {
    
    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        console.log(this.props)
        const { search } = this.props;
        return (
            <div>
                <Header url={this.props} />
                <div className="container">
                    <h1>Home</h1>
                    <div className="row">
                        {search.items &&
                            <div className="row">
                                {search.items.map((item, index) =>
                                    <div key={index} className="col"> 
                                        <img src={item.large_image_url} width="30px" height="30px" alt={item.title} />
                                        <h5>Name: {item.title}</h5>
                                        <h5>Asin: {item.asin}</h5>
                                        <h5>Availability: {item.availability}</h5>
                                        <a href={item.detail_page_url} target="_blank">Amazon</a>
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