import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import $ from 'jquery';

import { userActions } from '../_actions';

class EditProfilePage extends React.Component {
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

    handleChangeImg(event) {
        
        const { name, value } = event.target;
        const { photo } = this.state;
        this.setState({
            photo: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch, editUser } = this.props;
        if (user.first_name && user.last_name && user.username) {
            $().ready(function() {
                var value =  $("#editProfile_form").val();
                if(value) {
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
        console.log(photo);
        if (photo) {
            $().ready(function() {
                var value =  $("#image_form").val();
                console.log(value);

                if(value) {
                    var form = $('#myFormImage')[0];
                    // Create an FormData object
                    var data = new FormData(form);
                    dispatch(userActions.uploadImage(data));
                }
            });
        }
    }


    render() {
        if(this.state.render){
        const { editUser } = this.props;
        const { submitted, user, photo, validate } = this.state;
        return (
            <div className="row">
                <Header/>
                <div className=""> </div>
                <div className="col-lg-12"><h2>Edit Profile</h2></div>
                <div className="col-lg-6">
                
                    {editUser.items &&
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
                    
                                <Link to="/profile" className="btn btn-link">Cancel</Link>
                            </div>
                        </form>
                    }
                </div>
                <div className="col-lg-6">
                    {editUser.items &&
                        <form name="form-image" id="myFormImage" onSubmit={this.handleSubmitImage}>
                            <div className={'form-group' + (!photo ? ' has-danger' : '')}>
                                <div>
                                    <img src={editUser.items.photo} className="rounded-circle" height="100px" width="100px" />
                                </div>
                                <label htmlFor="photo">Photo</label>
                                <input type="file" name="photo" value={photo} onChange={this.handleChangeImg} required />
                                <input type="hidden" name="image_form" id="image_form" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Uplodad Photo</button>
                            </div>
                        </form>
                    }
                </div>
            </div>

        );
        }else{
            return (<div className="backgroud-body"></div>);
        }  
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