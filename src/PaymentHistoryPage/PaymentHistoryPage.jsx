import React from 'react';
import Pagination from "react-js-pagination";
import { connect } from 'react-redux';
import { Header } from '../Header';
import $ from 'jquery';
import './payment.css';

import { userActions } from '../_actions';

class PaymentHistoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        if(pageNumber > 0){
            console.log(pageNumber);
            this.props.dispatch(userActions.histoyPayment(pageNumber));
        }
    }
    
    componentDidMount() {
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
        this.props.dispatch(userActions.histoyPayment());
    }

    render() {
        console.log(this.props);
        const { paymentHistory } = this.props;
        console.log(paymentHistory);
        return (
            <div className="">
                <Header  url={this.props} />
                <div className="col-12 no-padding">
                    <h2>Payment History</h2>
                    <br/>
                        {paymentHistory.items &&
                        <div>
                            <table className="table table-hover">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Name Plan</th>
                                <th>Date Start</th>
                                <th>Date Finish</th>
                                </tr>
                            </thead>
                                <tbody>
                                {paymentHistory.items.results.map((plan, index) =>
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{plan.title}</td>
                                        <td>{new Date(plan.date_start).toDateString()}</td>
                                        <td>{new Date(plan.date_finish).toDateString()}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <div className="center-pagination">
                            {paymentHistory.items &&
                                <Pagination
                                hideDisabled
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={paymentHistory.items.count}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange} />
                            }
                            </div>
                            
                        </div>
                        
                        }
                        
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { paymentHistory  } = state;
    return {
        paymentHistory
    };
}

const connectedPaymentHistoryPage = connect(mapStateToProps)(PaymentHistoryPage);
export { connectedPaymentHistoryPage as PaymentHistoryPage };
