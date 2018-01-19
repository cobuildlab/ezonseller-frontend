import { userConstants, cardConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    recoveryPassword,
    changePassword,
    getAll,
    getUserId,
    getEditUserId,
    updateUser,
    changePasswordEdit,
    paymentPlans,
    addCreditCard,
    uploadImage,
    delete: _delete,
    deleteCreditCard,
    acquirePlan,
    cancelSuscription,
    cancelPlan
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    error.then(function(value) {
                        dispatch(failure(value.message));
                        dispatch(alertActions.error(value.message));
                  });
                }
            );
    };

    function request(user) { return  { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return  { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error} }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                  error.then(function(value) {
                    dispatch(failure(value.message));
                    dispatch(alertActions.error(value.message));
                    alertActions.displayErrorMessage(value.message);
                  });
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function recoveryPassword(email) {
    return dispatch => {
        dispatch(request(email));

        userService.recoveryPassword(email)
            .then(
                email => {
                    dispatch(success());
                    dispatch(alertActions.success(email.message));
                    history.push('/change');
                },
                error => {
                  error.then(function(value) {
                    dispatch(failure(value.message));
                    dispatch(alertActions.error(value.message));
                    alertActions.displayErrorMessage(value.message);
                  });
                }
            );
    };

    function request(email) { return { type: userConstants.RECOVERY_REQUEST, email } }
    function success(email) { return { type: userConstants.RECOVERY_SUCCESS, email } }
    function failure(error) { return { type: userConstants.RECOVERY_FAILURE, error } }
}

function changePassword(data) {
    return dispatch => {
        dispatch(request(data));
        userService.changePassword(data)
            .then(
                data => {
                    dispatch(success());
                    dispatch(alertActions.success(data.message));
                    history.push('/login');
                }).catch(error => {
                  console.log(error);
        });

    };

    function request(data) { return { type: userConstants.RECOVERY_REQUEST, data } }
    function success(data) { return { type: userConstants.RECOVERY_SUCCESS, data } }
    function failure(error) { return { type: userConstants.RECOVERY_FAILURE, error } }
}

function changePasswordEdit(data) {
    return dispatch => {
        dispatch(request(data));
        userService.changePasswordEdit(data)
            .then(
                data => {
                    dispatch(success());
                    dispatch(alertActions.success(data.message));
                    let value = {'Token': data.token, 'id': data.id};
                    localStorage.setItem('user', JSON.stringify(value));
                    history.push('/profile');
                }).catch(error => {
                    dispatch(failure(error))
        });

    };

    function request(data) { return { type: userConstants.RECOVERY_REQUEST, data } }
    function success(data) { return { type: userConstants.RECOVERY_SUCCESS, data } }
    function failure(error) { return { type: userConstants.RECOVERY_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getUserId(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                user  => dispatch(success(user)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function getEditUserId(id) {
    return dispatch => {
        dispatch(request());

        userService.editUserId(id)
            .then(
                editUser  => dispatch(success(editUser)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.EDITBYID_REQUEST } }
    function success(editUser) { return { type: userConstants.EDITBYID_SUCCESS, editUser } }
    function failure(error) { return { type: userConstants.EDITBYID_FAILURE, error } }
}

function updateUser(user) {
    return dispatch => {
        dispatch(request());

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success(user.message));
                    history.push('/profile');
                }).catch(error => {
                    dispatch(failure(error))
        });
    };

    function request() { return { type: userConstants.EDITBYID_REQUEST } }
    function success(user) { return { type: userConstants.EDITBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EDITBYID_FAILURE, error } }
}
function uploadImage(data){
    return dispatch => {
        dispatch(request());

        userService.uploadImage(data)
            .then(
                data => {
                    dispatch(success(data));
                    dispatch(alertActions.success(data.message));
                    history.push('/profile');
                }).catch(error => {
                    dispatch(failure(error))
        });
    };

    function request() { return { type: userConstants.EDITBYID_REQUEST } }
    function success(data) { return { type: userConstants.EDITBYID_SUCCESS, data } }
    function failure(error) { return { type: userConstants.EDITBYID_FAILURE, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function deleteCreditCard(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteCreditCard(id)
            .then(
                card => {
                    dispatch(success(id));
                    window.location.reload();
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.CARD_DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.CARD_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.CARD_DELETE_FAILURE, id, error } }
}

function paymentPlans() {
    return dispatch => {
        dispatch(request());

        userService.paymentPlans()
            .then(
                payments => {
                    dispatch(success(payments));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request()         { return { type: userConstants.GETALLPAYMENTS_REQUEST } }
    function success(payments) { return { type: userConstants.GETALLPAYMENTS_SUCCESS, payments } }
    function failure(error)    { return { type: userConstants.GETALLPAYMENTS_FAILURE, error } }
}

function addCreditCard(data) {
    return dispatch => {
        dispatch(request());

        userService.addCreditCard(data)
            .then(
                card  => {
                    dispatch(success(card))
                    history.push('/profile')
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request()      { return { type: userConstants.GETALLPAYMENTS_REQUEST } }
    function success(card)  { return { type: userConstants.GETALLPAYMENTS_SUCCESS, card } }
    function failure(error) { return { type: userConstants.GETALLPAYMENTS_FAILURE, error } }
}

function acquirePlan(data) {
    return dispatch => {
        dispatch(request());

        userService.acquirePlan(data)
            .then(
                plan  => {
                    dispatch(success(plan))
                    history.push('/profile')
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request()      { return { type: userConstants.GETALLPAYMENTS_REQUEST } }
    function success(plan)  { return { type: userConstants.GETALLPAYMENTS_SUCCESS, plan } }
    function failure(error) { return { type: userConstants.GETALLPAYMENTS_FAILURE, error } }
}

function cancelSuscription() {
    return dispatch => {
        dispatch(request());

        userService.cancelSuscription()
            .then(
                suscription => {
                    dispatch(success(suscription));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request()         { return { type: userConstants.SUSCRIPTION_GET_REQUEST } }
    function success(suscription) { return { type: userConstants.SUSCRIPTION_GET_SUCCESS, suscription } }
    function failure(error)    { return { type: userConstants.SUSCRIPTION_GET_FAILURE, error } }
}

function cancelPlan(data) {
    return dispatch => {
        dispatch(request());

        userService.cancelPlan(data)
            .then(
                suscription => {
                    history.push('/profile');
                    dispatch(success(suscription));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request()         { return { type: userConstants.SUSCRIPTION_GET_REQUEST } }
    function success(suscription) { return { type: userConstants.SUSCRIPTION_GET_SUCCESS, suscription } }
    function failure(error)    { return { type: userConstants.SUSCRIPTION_GET_FAILURE, error } }
}


