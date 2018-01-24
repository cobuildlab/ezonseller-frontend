import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { userActions } from '../_actions';

class Support extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            support: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { support } = this.state;

        this.setState({
            support: {
                ...support,
                [name]: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { support } = this.state;
        const { dispatch, url } = this.props;
        if(support.email && support.message && support.title){
            $().ready(function() {
                var value =  $("#support_form").val();
                if(value) {
                    $().ready(function() {
                        $(".fakeloader").show();
                    });
                    dispatch(userActions.actionSupport(support));
                 }
            });
        }
        
    }

        
    render() {
        const { body } = this.props;
        const { purchase } = this.state;
        return (
            <div className="container">
                <div className="col-md-10 content-edit col-center">
                    <h2 className="text-center">Support</h2>

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <div>
                                <form name="form-cancel" id="myFormSupport" onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                        <label htmlFor="purchase"><b>Email:</b></label>
                                        <input type="title" name="email" className="form-control" onChange={this.handleChange} required  />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="purchase"><b>Title:</b></label>
                                        <input type="input" name="title" className="form-control" onChange={this.handleChange} required  />
                                        <input type="hidden" name="support_form" id="support_form" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="purchase"><b>Message:</b></label>
                                        <textarea name="message" className="form-control" onChange={this.handleChange} required>
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Support</button>
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
    const { support } = state;
    return {
        support
    };
}

const connectedSupport = connect(mapStateToProps)(Support);
export { connectedSupport as Support };
