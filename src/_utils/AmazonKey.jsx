import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import $ from 'jquery';


import { userActions } from '../_actions';

class AmazonKey extends React.Component {
    
    constructor(props) {
            super(props);

            this.state = {
                amazon: {},
                submitted: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { amazon } = this.state;
        this.setState({
            amazon: {
                ...amazon,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { amazon } = this.state;
        const { dispatch } = this.props;
        if (amazon.country_id && amazon.associate_tag && amazon.access_key_id &&  amazon.secrect_access_key) {
        }
        console.log(amazon);
    }

    render() {
        const { registering, country  } = this.props;
        const { submitted, amazon } = this.state;
        return (
            <div className="">
                <Header/>
                <div className="container">
                    <h2 className="text-center">Add Amazon Key</h2>
                    <div className="col-md-7 content-edit col-center">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <form name="form" id="formAmazonKey" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="number">Country</label>
                                        <select className="form-control" id="country_id" name="country_id" onChange={this.handleChange} required>
                                            <option defaultValue="" selected>Select a Country</option>
                                            {country.map(option => {
                                                return <option value={option.id} key={option.id}>{option.name} - {option.code}</option>
                                            })}
                                        </select>
                                   </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Associate Tag</label>
                                        <input type="text" className="form-control" placeholder="" name="associate_tag"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cod_security">Access Key Id</label>
                                        <input type="text" className="form-control" placeholder="" name="access_key_id"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="year">Secrect Access Key</label>
                                        <input type="text" className="form-control" placeholder="" name="secrect_access_key" onChange={this.handleChange} required />
                                        <input type="hidden" name="creditCard_form" id="creditCard_form" />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary">Add Credit Card</button>
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
    const { amazon } = state;
    return {
        amazon
    };
}

const connectedAmazonKey = connect(mapStateToProps)(AmazonKey);
export { connectedAmazonKey as AmazonKey };