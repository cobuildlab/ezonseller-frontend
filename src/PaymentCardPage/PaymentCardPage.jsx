import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';


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
        card.type_card = "visa";
        if (card.name && card.number_card && card.cod_security && card.date_expiration) {
            dispatch(userActions.addCreditCard(card));
        }
        console.log(card);
    }


    render() {
        const { submitted, card } = this.state;
        return (
            <div className="">
                <Header/>
                <div className="container">
                    <h1>Add Credit Card</h1>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !card.name ? ' has-danger' : '')}>
                            <label htmlFor="name">Name PlaceHolder</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            {submitted && !card.name &&
                                <div className="form-control-feedback">Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !card.number_card ? ' has-danger' : '')}>
                            <label htmlFor="number_card">Number Card</label>
                            <input type="text" className="form-control" name="number_card" onChange={this.handleChange} />
                            {submitted && !card.number_card &&
                                <div className="form-control-feedback">Number Card is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !card.cod_security ? ' has-danger' : '')}>
                            <label htmlFor="cod_security">Cod Security</label>
                            <input type="text" className="form-control" name="cod_security"  onChange={this.handleChange} />
                            {submitted && !card.cod_security &&
                                <div className="form-control-feedback">Cod Security is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !card.date_expiration ? ' has-danger' : '')}>
                            <label htmlFor="date_expiration">Date Expiration</label>
                            <input type="text" className="form-control" name="date_expiration"  onChange={this.handleChange} />
                            {submitted && !card.date_expiration &&
                                <div className="form-control-feedback">Date Expiration is required</div>
                            }
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-primary">Add Credit Card</button>
                   
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