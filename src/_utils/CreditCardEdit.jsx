import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import { userActions } from '../_actions';

class CreditCardEdit extends React.Component {
    
    constructor(props) {
            super(props);

            this.state = {
                cardCredit:{},
                submitted: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleCreditCardTypeFromNumber = this.handleCreditCardTypeFromNumber.bind(this)
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.editCard.items){
            this.setState({
                cardCredit: {
                    id: nextProps.editCard.items.id,
                    number_card: nextProps.editCard.items.number_card, 
                    first_name: nextProps.editCard.items.first_name,
                    last_name: nextProps.editCard.items.last_name,
                    cod_security: nextProps.editCard.items.cod_security,
                    year: nextProps.editCard.items.year,
                    month: nextProps.editCard.items.month
                },
                render: true
            })
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });
        }        
    };

    handleChange(event) {
        const { name, value } = event.target;
        const { cardCredit } = this.state;
        this.setState({
            cardCredit: {
                ...cardCredit,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { cardCredit } = this.state;
        const { dispatch }   = this.props;
        if (cardCredit.first_name && cardCredit.last_name && cardCredit.number_card && cardCredit.cod_security &&  cardCredit.year && cardCredit.month) {
            let type_card = this.handleCreditCardTypeFromNumber(cardCredit.number_card);
            cardCredit.date_expiration = '20' + cardCredit.year + '-' + cardCredit.month + '-01';
            cardCredit.type_card = type_card;
            console.log(cardCredit);
            $().ready(function() {
                var value =  $("#creditCard_form").val();
                if(value) {
                    $(".fakeloader").show();
                    dispatch(userActions.addCreditCard(cardCredit));
                }
            });
            
            
        }
    }
    handleCreditCardTypeFromNumber(num) {
        // first, sanitize the number by removing all non-digit characters.
        num = num.replace(/[^\d]/g,'');
        // now test the number against some regexes to figure out the card type.
        if (num.match(/^5[1-5]\d{14}$/)) {
          return 'mastercard';
        } else if (num.match(/^4\d{15}/) || num.match(/^4\d{12}/)) {
          return 'visa';
        } else if (num.match(/^3[47]\d{13}/)) {
          return 'americanexpress';
        } else if (num.match(/^6011\d{12}/)) {
          return 'discover';
        }
        return 'UNKNOWN';
      }


    render() {
        const { registering, editCard } = this.props;
        return (
            <div className="">
                {editCard.items &&
                <div className="container">
                    <h2 className="text-center">Edit Credit Card</h2>
                    <div className="col-md-7 content-edit col-center">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <form name="form" id="formEditCreditCard" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="number">Number Card</label>
                                        <input type="text" className="form-control" name="number_card" onChange={this.handleChange} defaultValue={editCard.items.number_card} required />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="name">FirstName</label>
                                        <input type="text" className="form-control" name="first_name"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">LastName</label>
                                        <input type="text" className="form-control" name="last_name"  onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cod_security">Cod Security</label>
                                        <input type="text" className="form-control" name="cod_security" defaultValue={editCard.items.cod_security} onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="year">Exp. Year</label>
                                        <input type="text" className="form-control" name="year" defaultValue={editCard.items.year} onChange={this.handleChange} required />
                                        <input type="hidden" name="creditCard_form" id="creditCard_form" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="month">Exp. Month</label>
                                        <input type="text" className="form-control" name="month" defaultValue={editCard.items.month} onChange={this.handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary">Add Credit Card</button>
                                        {registering &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="logo" />
                                        }
                                        <Link to="/profile" className="btn btn-danger">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { editCard } = state;
    return {
        editCard
    };
}

const connectedCreditCardEdit = connect(mapStateToProps)(CreditCardEdit);
export { connectedCreditCardEdit as CreditCardEdit };