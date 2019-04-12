import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import './plandetailspage.css';
import {userActions} from "../_actions";

class PlanDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: ''
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(userActions.getPlan(id));
        $().ready(function () {
            $(".fakeloader").fadeOut();
        });
    }


    componentWillReceiveProps = (nextProps) => {
        if (nextProps.getplan) {
            this.setState({
                plan: nextProps.getplan,

            });


        }
    };

    render() {
        const {plan} = this.state;

        return (
            <div>
                {plan.items &&
                        <div className="data-credit">

                            {plan.items.map((plan, index) =>
                            <div key={index}>
                                    <div key={index}>
                                        <h5><b>Name:</b> {plan.fields.title}</h5>
                                        <h5><b>Description:</b> <p className="text-justify">{plan.fields.description}</p></h5>
                                        <h5><b>Terms:</b> <p className="text-justify">{plan.fields.terms}</p></h5>
                                        <h5><b>Cost:</b> {plan.fields.cost}$</h5>
                                        <h5><b>Duration:</b> {plan.fields.duration}</h5>
                                    </div>
                            </div>
                        )}
                      </div>
                    }</div>
        );
    }
}

function mapStateToProps(state) {
    const {getplan, plan} = state;
    return {
        getplan,
        plan
    };
}

const connectedDetailsPlanPage = connect(mapStateToProps)(PlanDetailsPage);
export {connectedDetailsPlanPage as DetailsPlanPage};
