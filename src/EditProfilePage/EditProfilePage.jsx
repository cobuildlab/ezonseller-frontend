import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';


import { userActions } from '../_actions';

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user:{},
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
                    }
            })
        }        
    }


    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch, editUser } = this.props;
        if (user.first_name && user.last_name && user.username) {
            dispatch(userActions.updateUser(user));
        }
    }


    render() {
        const { editUser } = this.props;
        const { submitted, user } = this.state;
        return (
            <div className="col-lg-12">
                <Header/>
                <h2>Edit Profile</h2>
                {editUser.items &&
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.first_name ? ' has-danger' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="first_name" defaultValue={editUser.items.first_name} onChange={this.handleChange} />
                            {submitted && !user.first_name &&
                                <div className="form-control-feedback">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.last_name ? ' has-danger' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="last_name" defaultValue={editUser.items.last_name} onChange={this.handleChange} />
                            {submitted && !user.last_name &&
                                <div className="form-control-feedback">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.username ? ' has-danger' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" defaultValue={editUser.items.username} onChange={this.handleChange} />
                            {submitted && !user.username &&
                                <div className="form-control-feedback">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.photo ? ' has-danger' : '')}>
                            <label htmlFor="photo">Photo</label>
                            <input type="file" name="photo" defaultValue={editUser.items.photo} onChange={this.handleChange} />
                            {submitted && !user.Photo &&
                                <div className="form-control-feedback">Photo is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Edit Profile</button>
                   
                            <Link to="/profile" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                }
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