import { userConstants } from '../_constants';
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
    delete: _delete
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

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
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
