import React from 'react';
import { connect } from 'react-redux';
import './footer.css';
import '../index.css';

class Footer extends React.Component {

    render() {
        return (
            <div className="col-lg-12">
              <footer className="app-footer text-center">
  			        <span><a href="">4Geeks</a> &copy; 2018. </span>
  			        <span className="ml-auto">Powered by <a href="">4Geeks</a></span>
  			      </footer>
            </div>
        );
    }
}



const connectedFooter = connect(null)(Footer);
export { connectedFooter as Footer };
