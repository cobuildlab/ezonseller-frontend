import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from '../assets/logo.png'
import './register.css';
import '../index.css';
import $ from 'jquery';
import Recaptcha from 'react-grecaptcha';
import {toast} from 'react-toastify';
import {userService} from '../_services'

import {userActions} from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             user: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                password: '',
                confirm_password: '',
                terms: '',
                register_form: ''
            },
            card:{
                number_card:'',
                first_name_card:'',
                last_name_card:'',
                cod_security:'',
                year:'',
                month:''
            },
            callback: '',
            submitted: false,
            plan_list: '',
            plan: {
                id:''
            }
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCard = this.handleChangeCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreditCardTypeFromNumber = this.handleCreditCardTypeFromNumber.bind(this);
        this.handleValidCard = this.handleValidCard.bind(this);
        this.handleChangePlan = this.handleChangePlan.bind(this)

    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleChangeCard(event) {
        const {name, value} = event.target;
        const {card} = this.state;


        this.setState({
            card: {
                ...card,
                [name]: value
            }
        });
    }

    handleChangePlan(event) {
        const {plan} = this.state;
        const id = event.target.value;

        this.setState({
            plan: {
                id:id
            }
        });

    }

    componentDidMount() {
        this.props.dispatch(userActions.getAllPlan());
        $().ready(function () {
            $(".fakeloader").fadeOut();
        });
    }

    handleValidCard(card) {
        if (card.first_name_card && card.last_name_card && card.number_card && card.cod_security && card.year && card.month) {
            let type_card = this.handleCreditCardTypeFromNumber(card.number_card);
            card.date_expiration = '20' + card.year + '-' + card.month + '-01';
            card.type_card = type_card;
            card.first_name = card.first_name_card;
            card.last_name = card.last_name_card;
            return card
        }


        return false
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user, callback} = this.state;
        const {dispatch} = this.props;
        let {card} = this.state;
        let {plan} = this.state;
        card = this.handleValidCard(card);
        if (user.first_name && user.last_name && user.username && user.password && user.email && user.terms && card && plan) {

            let data = {user: user, card: card, plan:plan};

            $().ready(function () {
                let registerLoad = $('.registerLoad');
                registerLoad.fadeIn();
                var value = $("#register_form").val();
                if (callback) {
                    if (value) {
                        user.callback = callback;
                        dispatch(userActions.register(data));
                    }
                } else {
                registerLoad.fadeOut();
                    toast.error('The Captcha is Required.', {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }

            });


        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.getallplan) {
            let id;
            if (nextProps.getallplan.items) {
                nextProps.getallplan.items.map(function (plan,index) {
                   if (index == 0) {
                        id =  plan.pk
                    }
                });
            }

            this.setState({
                plan_list: nextProps.getallplan,
                render: true,
                plan: {
                    id:id
                }
            });


        }
    };



    handleCreditCardTypeFromNumber(num) {
        // first, sanitize the number by removing all non-digit characters.
        num = num.replace(/[^\d]/g, '');
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
        const {registering} = this.props;
        const {user, card, plan_list, plan } = this.state;
        const verifyCallback = response => {
            this.setState({
                callback: response
            })
        }


        const expiredCallback = () => console.log('expired');
        return (
            <div className="col-md-12 no-padding">
                <img src={Logo} className="logo-img center-block img-fluid" alt=""/>
                <div className="row top d-flex justify-content-center">
                    <div className="col-md-8 col-10 section-register">
                        <h2 className="bottom-title">Register</h2>
                        <form name="form" id="commentForm" onSubmit={this.handleSubmit}>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control rigth-input" placeholder="First name"
                                               name="first_name" value={user.first_name} onChange={this.handleChange}
                                               required/>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className="form-control" placeholder="Last name"
                                               name="last_name" value={user.last_name} onChange={this.handleChange}
                                               required/>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control rigth-input" placeholder="Username"
                                               name="username" value={user.username} onChange={this.handleChange}
                                               required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email"
                                               value={user.email} onChange={this.handleChange} required/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" placeholder="Password"
                                               id="password" name="password" value={user.password}
                                               onChange={this.handleChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Confirm Password"
                                               name="confirm_password" value={user.confirm_password}
                                               onChange={this.handleChange} required/>
                                    </div>
                                </div>
                            </div>


                            <h2 className="">Add Credit Card</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="number">Card Number</label>
                                        <input type="text" className="form-control" name="number_card"
                                               value={card.number_card} onChange={this.handleChangeCard} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">FirstName</label>
                                        <input type="text" className="form-control" name="first_name_card"
                                               value={card.first_name_card} onChange={this.handleChangeCard} required/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name">LastName</label>
                                        <input type="text" className="form-control" name="last_name_card"
                                               value={card.last_name_card} onChange={this.handleChangeCard} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="cod_security">Cod Security</label>
                                        <input type="text" className="form-control" name="cod_security"
                                               value={card.cod_security} onChange={this.handleChangeCard} required/>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="year">Exp. Year</label>
                                        <input type="text" className="form-control" name="year" value={card.year}
                                               onChange={this.handleChangeCard} required/>
                                        <input type="hidden" name="creditCard_form" id="creditCard_form"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="month">Exp. Month</label>
                                        <input type="text" className="form-control" name="month" value={card.month}
                                               onChange={this.handleChangeCard} required/>
                                    </div>
                                </div>
                            </div>

                            <h2 className="">Plan</h2>
                            <h3 className="text-center">First 14 Days Free</h3>
                            <div className="row">
                                <div className="col-md-8 offset-md-1">
                                    <div className="form-group">
                                        {plan_list.items &&
                                        <select className="form-control" onChange={this.handleChangePlan}>
                                            {plan_list.items.map((plan, index) =>
                                                <option key={index} value={plan.pk}>{plan.fields.title} -
                                                    Cost: {plan.fields.cost} $</option>
                                            )}

                                        </select>
                                        }
                                    </div>
                                </div>
                                {plan &&
                                <div className="col-md-2">
                                    <Link to={"/plan-details/" + plan.id} target="_blank" className="btn btn-link term">Plan Details</Link>
                                </div>
                                    }
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="col-md-12 no-padding text-center">
                                            <input type="radio" className="" name="terms" onChange={this.handleChange}
                                                   required/>
                                            <input type="hidden" name="register_form" id="register_form"
                                                   value={user.register_form}/>
                                            <Link to="/terms" target="_blank" className="btn btn-link term ">I Accept the
                                                Terms and Conditions Ezonseller.</Link>
                                        </div>
                                    </div>
                                </div>


                               <div className="col-md-12">
                                <div className="form-group">
                                    <div className="d-flex justify-content-center">
                                    <Recaptcha
                                        sitekey='6LcX-0oUAAAAAPd2e5t_txQsSZcWrOr6CpLsAr1o'
                                        callback={verifyCallback}
                                        expiredCallback={expiredCallback}
                                        locale="gb-EN"
                                        className="customClassName"
                                        // Other props will be passed into the component.
                                    />
                                    </div>
                                </div>
                            </div>

                            </div>


                            <div className="form-group d-flex justify-content-center">
                                <button className="btn btn-primary" id="create_account"><img
                                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                    alt="logo" className='registerLoad'/>Create Account</button>


                                <Link to="/login" className='btn btn-danger'>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    const {edit, callback, card, getallplan, plan} = state;

    return {
        edit,
        callback,
        card,
        getallplan,
        plan,

    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
