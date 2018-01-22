import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import $ from 'jquery';
class CancelSuscription extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            purchase: {},
            value: 'asd'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const { dispatch, url } = this.props;
        purchase.id_plan = url;
        if(purchase){
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });      
            dispatch(userActions.cancelPlan(purchase));
        }
    }

        
    render() {
        const { body } = this.props;
        const { purchase, value } = this.state;
        return (
            <div className="container">
                <div className="col-md-10 content-edit col-center">
                    <h2 className="text-center">Cancel Plan Suscription</h2>

                    { body.items.map((cancel, index) =>
                    <div className="text-center" key={index}>
                        <p className="text-justify">{cancel.description}</p>
                    </div>
                        )}
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">

                            <div>
                                {body.items.map((cancel, index) =>
                                    <div key={index}>
                                        <form name="form-cancel" id="myFormCancel" onSubmit={this.handleSubmit} >
                                            {cancel.list.map((list, index) =>
                                            <div key={index} className={'form-group' + (!purchase ? ' has-danger' : '')}>
                                                <input type="radio" className="" name="option" defaultValue={list} onChange={this.handleChange} required  />
                                                {list}
                                            </div>
                                                )}
                                            <div className={'form-group' + (!purchase ? ' has-danger' : '')}>
                                                <input type="radio" className="" name="option" defaultValue="Other" onChange={this.handleChange} required  />
                                                Other
                                            </div>
                                            <div className={'form-group' + (!purchase ? ' has-danger' : '')}>
                                                <label htmlFor="purchase"><b>Reason:</b></label>
                                                    <textarea name="reason" defaultValue={purchase.reason} className="form-control" onChange={this.handleChange} >

                                                    </textarea>
                                            </div>
                                            <div className="form-group">
                                                <button className="btn btn-primary">Cancel Suscription</button>
                                                <Link to="/profile" className="btn btn-danger">Cancel</Link>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { cancelPlans } = state;
    return {
        cancelPlans
    };
}

const connectedCancelSuscription = connect(mapStateToProps)(CancelSuscription);
export { connectedCancelSuscription as CancelSuscription };
