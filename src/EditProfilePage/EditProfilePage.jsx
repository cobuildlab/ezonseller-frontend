import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { EditProfile } from '../_utils';
import $ from 'jquery';
import './EditProfile.css';

import { userActions } from '../_actions';

class EditProfilePage extends React.Component {

    componentDidMount() {
        let valueUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getEditUserId(valueUser.id));
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.editUser.items){
            this.setState({
                user: {
                    id: nextProps.editUser.items.id,
                    first_name: nextProps.editUser.items.first_name, 
                    last_name: nextProps.editUser.items.last_name,
                    username: nextProps.editUser.items.username
                },
                render: true
            })
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });
        }        
    };

    render() {
        const { editUser } = this.props;

        return (
            <div className="">
                <Header/>
                <EditProfile editUser={editUser} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { editUser, registering } = state;
    return {
        editUser,
        registering
    };
}

const connectedEditProfilePage = connect(mapStateToProps)(EditProfilePage);
export { connectedEditProfilePage as EditProfilePage };