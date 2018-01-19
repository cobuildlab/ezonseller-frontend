import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import $ from 'jquery';


import { userActions } from '../_actions';

class PaymentCardPage extends React.Component {
    
    constructor(props) {
            super(props);

            this.state = {
                card:{},
                submitted: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleCreditCardTypeFromNumber = this.handleCreditCardTypeFromNumber.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { card } = this.state;
        this.setState({
            card: {
                ...card,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { card } = this.state;
        const { dispatch } = this.props;
        if (card.name && card.number_card && card.cod_security &&  card.year && card.month) {
            let type_card = this.handleCreditCardTypeFromNumber(card.number_card);
            card.date_expiration = '20' + card.year + '-' + card.month + '-01';
            card.type_card = type_card;
            $().ready(function() {
                var value =  $("#creditCard_form").val();
                if(value) {
                    dispatch(userActions.addCreditCard(card));
                }
            });
            
            
        }
    }
    handleCreditCardTypeFromNumber(num) {
        // first, sanitize the number by removing all non-digit characters.
        num = num.replace(/[^\d]/g,'');
        // now test the number against some regexes to figure out the card type.
        if (num.match(/^5[1-5]\d{14}$/)) {
          return 'MasterCard';
        } else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
          return 'Visa';
        } else if (num.match(/^3[47]\d{13}/)) {
          return 'AmEx';
        } else if (num.match(/^6011\d{12}/)) {
          return 'Discover';
        }
        return 'UNKNOWN';
      }


    render() {
        const { registering  } = this.props;
        const { submitted, card } = this.state;
        return (
            <div className="">
                <Header/>
                <div className="container">
                    <h1>Add Credit Card</h1>
                    <form name="form" id="formCreditCard" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="number">Number Card</label>
                            <input type="text" className="form-control" placeholder="xxxxxxxxxx" name="number_card" onChange={this.handleChange} required />
                       </div>
                        <div className="form-group">
                            <label htmlFor="name">Name PlaceHolder</label>
                            <input type="text" className="form-control" placeholder="Ex: Jhon Doe" name="name"  onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cod_security">Cod Security</label>
                            <input type="text" className="form-control" placeholder="Ex: 123" name="cod_security"  onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input type="text" className="form-control" placeholder="Ex: 18" name="year" onChange={this.handleChange} required />
                            <input type="hidden" name="creditCard_form" id="creditCard_form" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="month">Month</label>
                            <input type="text" className="form-control" placeholder="Ex: 10" name="month" onChange={this.handleChange} required />
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-primary">Add Credit Card</button>
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/profile" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { card } = state;
    return {
        card
    };
}

const connectedPaymentCardPage= connect(mapStateToProps)(PaymentCardPage);
export { connectedPaymentCardPage as PaymentCardPage };