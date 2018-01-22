import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { Profile } from '../_utils';
import './profile.css';

import $ from 'jquery';

import { userActions } from '../_actions';

class ProfilePage extends React.Component {

    componentWillMount(){
        $().ready(function() {
            $(".fakeloader").show();
        });
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.user.items){
            $().ready(function() {
                $(".fakeloader").fadeOut();
            });
        }
    };

    componentDidMount() {
        let valueUser = JSON.parse(localStorage.getItem('user'));
        this.props.dispatch(userActions.getUserId(valueUser.id));
        this.props.dispatch(userActions.paymentPlans());
    }

    render() {
        const { user } = this.props;
        return (
            <div className="">
                <Header/>

                {user.items &&
                    <Profile user={user.items} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, paymentsPlans } = state;
    return {
        user,
        paymentsPlans
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
