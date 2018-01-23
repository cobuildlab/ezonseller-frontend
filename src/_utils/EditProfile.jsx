import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import { userActions } from '../_actions';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user:{},
            submitted: false,
            photo: "",
            render: true
        };

        this.handleChange      = this.handleChange.bind(this);
        this.handleSubmit      = this.handleSubmit.bind(this);
        this.handleChangeImg   = this.handleChangeImg.bind(this);
        this.handleSubmitImage = this.handleSubmitImage.bind(this);
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

    handleChangeImg(event) {
        const { value } = event.target;
        this.setState({
            photo: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;

        if (user.first_name && user.last_name && user.username) {
            $().ready(function() {
                var value =  $("#editProfile_form").val();
                if(value) {
                    $().ready(function() {
                        $(".fakeloader").show();
                    });
                    dispatch(userActions.updateUser(user));
                 }
            });
        }
    }

    handleSubmitImage(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { photo } = this.state;
        const { dispatch } = this.props;
        if (photo) {
            $().ready(function() {
                var value =  $("#image_form").val();
                if(value) {
                    var form = $('#myFormImage')[0];
                    // Create an FormData object
                    var data = new FormData(form);
                    $().ready(function() {
                        $(".fakeloader").show();
                    });
                    dispatch(userActions.uploadImage(data));
                }
            });
        }
    }

    render() {
        const { editUser } = this.props;
        const { photo } = this.state;
        return (
            <div>
                <h2 className="text-center">Edit Profile</h2>
                    {editUser.items &&
                    <div className="col-md-7 content-edit col-center">
                        <div className="col-12">
                            <form name="form-image" id="myFormImage" onSubmit={this.handleSubmitImage}>
                                <div className="col-md-12 no-padding">
                                    <div className="avatar-profile center"></div>
                                    <div className="form-group">
                                        <input type="file" name="photo" value={photo} onChange={this.handleChangeImg} required />
                                        <input type="hidden" name="image_form" id="image_form" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Uplodad Photo</button>
                                </div>
                            </form>
                            <form name="form" id="myFormEditProfile" onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="first_name" name="first_name" defaultValue={editUser.items.first_name} onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="last_name" defaultValue={editUser.items.last_name} onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" defaultValue={editUser.items.username} onChange={this.handleChange} required />
                                    <input type="hidden" name="editProfile_form" id="editProfile_form" />
                                </div>
                                <div className="form-group">
                                <button className="btn btn-primary">Edit Profile</button>

                                <Link to="/profile" className="btn btn-danger">Cancel</Link>
                            </div>
                        </form>
                        </div>
                    </div>
                    }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { editUser } = state;
    return {
        editUser
    };
}

const connectedEditProfile = connect(mapStateToProps)(EditProfile);
export { connectedEditProfile as EditProfile };