import React from 'react';
import { connect } from 'react-redux';
import './footer.css';
import '../index.css';

class Footer extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-lg-12">
              <footer className="app-footer">
  			        <span><a href="">4Geeks</a> &copy; 2018. </span>
  			        <span className="ml-auto">Powered by <a href="">4Geeks</a></span>
  			      </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedFooter = connect(mapStateToProps)(Footer);
export { connectedFooter as Footer };
