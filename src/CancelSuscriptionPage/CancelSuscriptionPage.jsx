import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';
import './profile.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class CancelSuscriptionPage extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                purchase: {},
                submitted: false
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);        
    }

    componentDidMount() {
        this.props.dispatch(userActions.cancelSuscription());
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { purchase } = this.state;

        this.setState({
            purchase: {
                ...purchase,
                [name]: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { purchase } = this.state;
        const { dispatch, editUser } = this.props;
        console.log(purchase);
    }

    render() {
        const { user, paymentsPlans, cancelPlans } = this.props;
        const { purchase, submitted } = this.state;
        console.log(this.props);
        let valueUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="">
                <Header/>
                <div className="col-12 no-padding">
                    <h2>Cancel Plan</h2>
                    
                    {cancelPlans.items &&
                        <div>
                            {cancelPlans.items.map((cancel, index) =>
                                <div className="text-center">
                                    <p>{cancel.description}</p>
                                </div>
                            )}                    
                        </div>
                    }
                    </div>
                    <div>
                    {cancelPlans.items &&
                        <div>
                            {cancelPlans.items.map((cancel, index) =>
                                <div>
                                    <form name="form-cancel" id="myFormCancel" onSubmit={this.handleSubmitImage} >
                                    {cancel.list.map((list, index) =>
                                        <div className={'form-group' + (!purchase ? ' has-danger' : '')}>
                                            <input type="radio" className="" name="id_plan" defaultValue={purchase.list} required  />
                                            {list}
                                        </div>                              
                                    )}
                                    <div className={'form-group' + (!purchase ? ' has-danger' : '')}>
                                        <input type="radio" className="" name="id_plan" defaultValue="purchase.other" required  />
                                        Other
                                    </div>
                                    <div className={'form-group' + (!purchase ? ' has-danger' : '')}>
                                        <label htmlFor="purchase"><b>Reason:</b></label>
                                        <textarea name="reason" defaultValue="purchase.reason" className="form-control">
                                        
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Cancel Suscription</button>
                                    </div>
                                    </form>
                                </div>
                            )}                    
                        </div>
                    }
                    </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, paymentsPlans, cancelPlans  } = state;
    return {
        user,
        paymentsPlans,
        cancelPlans
    };
}

const connectedCancelSuscriptionPage = connect(mapStateToProps)(CancelSuscriptionPage);
export { connectedCancelSuscriptionPage as CancelSuscriptionPage };
