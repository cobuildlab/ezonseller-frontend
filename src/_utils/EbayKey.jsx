import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import $ from 'jquery';

import { userActions } from '../_actions';

class EbayKey extends React.Component {
    
    constructor(props) {
            super(props);

            this.state = {
                ebay: {},
                submitted: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { amazon } = this.state;
        this.setState({
            ebay: {     
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { ebay } = this.state;
        const { dispatch } = this.props;
        if (ebay.client_id) {
            dispatch(userActions.ebayKey(ebay));
        }
    }

    render() {
        const { registering } = this.props;
        const { submitted, ebay } = this.state;
        return (
            <div className="">
                <Header/>
                <div className="container">
                    <h2 className="text-center">Add Ebay Key</h2>
                    <div className="col-md-7 content-edit col-center">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <form name="form" id="formEbayKey" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Client ID</label>
                                        <input type="text" className="form-control" placeholder="" name="client_id"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Add Ebay Key</button>
                                        {registering &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/profile" className="btn btn-danger">Cancel</Link>
                                    </div>
                                </form>
                            </div>
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

const connectedEbayKey = connect(mapStateToProps)(EbayKey);
export { connectedEbayKey as EbayKey };