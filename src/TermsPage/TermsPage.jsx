import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { termsActions } from '../_actions';

class TermsPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(termsActions.getTerms());
        $().ready(function() {
            $(".fakeloader").fadeOut();
        });
    }

    render() {
        const { term } = this.props;
        return (
            <div className="">
                <div className="container">
                <h1>Terms</h1>
                  {term.items &&
                    <p>{term.items.description}</p>
                  }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { term } = state;
    return {
        term
    };
}

const connectedProfilePage = connect(mapStateToProps)(TermsPage);
export { connectedProfilePage as TermsPage };
