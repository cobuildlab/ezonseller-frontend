import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { CancelSuscription } from '../_utils';
import './CancelSuscription.css';
import $ from 'jquery';

import { userActions } from '../_actions';

class CancelSuscriptionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchase: {},
            submitted: false,
            value: ''
        };
    }
    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });      
    }

    componentDidMount() {
        this.props.dispatch(userActions.cancelSuscription());
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.cancelPlans.items){
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });            
        }        
    };

    render() {
        const { cancelPlans } = this.props;
        return (
            <div className="">
                <Header />
                <div className="col-12 no-padding">
                    {cancelPlans.items &&
                    <div>
                        <CancelSuscription body={cancelPlans}
                            url={this.props.match.params.id} />
                    </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { cancelPlans  } = state;
    return {
        cancelPlans
    };
}

const connectedCancelSuscriptionPage = connect(mapStateToProps)(CancelSuscriptionPage);
export { connectedCancelSuscriptionPage as CancelSuscriptionPage };
