import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Footer } from '../Footer';


import { userActions } from '../_actions';

class ProfilePage extends React.Component {

    componentDidMount() {
        let valueUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getUserId(valueUser.id));
    }

    render() {
        const { user } = this.props;
        let valueUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="">
                <Header/>
                <div className="container">
                <h1>Profile</h1>
                {user.items &&
                    <ul>
                        <li>{user.items.first_name}</li>
                        <li>{user.items.last_name}</li>
                        <li>{user.items.username}</li>
                        <li>{user.items.type_plan}</li>
                        <li>{user.items.email}</li>
                        <li>{user.items.photo}</li>
                    </ul>
                }
                <Link to={"/edit-profile/" + valueUser.id} className="btn btn-primary">Edit Profile</Link>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
