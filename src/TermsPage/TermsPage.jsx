import React from 'react';
import { connect } from 'react-redux';

import { termsActions } from '../_actions';

class TermsPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(termsActions.getTerms());
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
