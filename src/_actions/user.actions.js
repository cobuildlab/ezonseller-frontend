import { userConstants, countryConstants, searchConstants } from '../_constants';
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
    cancelPlan,
    countryList,
    amazonKey,
    ebayKey,
    deleteAmazonAssociate,
    deleteEbayAssociate,
    getCountry,
    getSearch,
    activateAccount,
    getProductEbay,
    actionSupport,
    lastSearch,
    detailCreditCard
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
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
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
                    window.grecaptcha.reset();  
                    dispatch(failure(value.message));
                    dispatch(alertActions.error(value.message));
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
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
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
                },              
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(data)  { return { type: userConstants.RECOVERY_REQUEST, data } }
    function success(data)  { return { type: userConstants.RECOVERY_SUCCESS, data } }
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
                },              
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(data)  { return { type: userConstants.RECOVERY_REQUEST, data } }
    function success(data)  { return { type: userConstants.RECOVERY_SUCCESS, data } }
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

    function request()      { return { type: userConstants.GETALL_REQUEST } }
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

    function request()      { return { type: userConstants.GETBYID_REQUEST } }
    function success(user)  { return { type: userConstants.GETBYID_SUCCESS, user } }
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
    function success(editUser)  { return { type: userConstants.EDITBYID_SUCCESS, editUser } }
    function failure(error)     { return { type: userConstants.EDITBYID_FAILURE, error } }
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
                },              
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: userConstants.EDITBYID_REQUEST } }
    function success(user)  { return { type: userConstants.EDITBYID_SUCCESS, user } }
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
                },              
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: userConstants.EDITBYID_REQUEST } }
    function success(data)  { return { type: userConstants.EDITBYID_SUCCESS, data } }
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
                    dispatch(failure, (id, error));
                    dispatch(alertActions.error(error));
                }
        );
};

    function request(id)        { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id)        { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function deleteCreditCard(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteCreditCard(id)
            .then(
                card => {
                    dispatch(success(id));
                    dispatch(alertActions.success(card.message));
                    setTimeout(function(){
                        window.location.reload();
                    },1000)
                },
                error => {
                    dispatch(failure, (id, error));
                    dispatch(alertActions.error(error));
                }
        );
};

    function request(id)        { return { type: userConstants.CARD_DELETE_REQUEST, id } }
    function success(id)        { return { type: userConstants.CARD_DELETE_SUCCESS, id } }
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
                    dispatch(failure, (error));
                    dispatch(alertActions.error(error));
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
                    dispatch(alertActions.success(card.message));
                    history.push('/profile')
                },
                error => {
                    dispatch(failure, (error));
                    dispatch(alertActions.error(error));
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
                    dispatch(alertActions.success(plan.message));
                    history.push('/profile')
                },
                error => {
                    dispatch(failure, (error));
                    dispatch(alertActions.error(error));
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
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()            { return { type: userConstants.SUSCRIPTION_GET_REQUEST } }
    function success(suscription) { return { type: userConstants.SUSCRIPTION_GET_SUCCESS, suscription } }
    function failure(error)       { return { type: userConstants.SUSCRIPTION_GET_FAILURE, error } }
}

function cancelPlan(data) {
    return dispatch => {
        dispatch(request());

        userService.cancelPlan(data)
            .then(
                suscription => {
                dispatch(alertActions.success(suscription.message));
                history.push('/profile');
                //dispatch(success(suscription));
                },
                error => {
                    dispatch(failure, (error));
                    dispatch(alertActions.error(error));
                }
        );
};

    function request()            { return { type: userConstants.SUSCRIPTION_GET_REQUEST } }
    function success(suscription) { return { type: userConstants.SUSCRIPTION_GET_SUCCESS, suscription } }
    function failure(error)       { return { type: userConstants.SUSCRIPTION_GET_FAILURE, error } }
}

function countryList() {
    return dispatch => {
        dispatch(request());

        userService.countryList()
            .then(
                allCountry => {
                    dispatch(success(allCountry));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()            { return { type: countryConstants.GETALL_REQUEST } }
    function success(allCountry)  { return { type: countryConstants.GETALL_SUCCESS, allCountry } }
    function failure(error)       { return { type: countryConstants.GETALL_FAILURE, error } }
}

function amazonKey(data){
    return dispatch => {
        dispatch(request());

        userService.amazonKey(data)
            .then(
                amazon  => {
                    dispatch(success(amazon))
                    dispatch(alertActions.success(amazon.message));
                    history.push('/profile')
                },
                error => {
                    dispatch(failure, (error));
                    dispatch(alertActions.error(error));
                }
        );
};



    function request()        { return { type: userConstants.GETALLPAYMENTS_REQUEST } }
    function success(amazon)  { return { type: userConstants.GETALLPAYMENTS_SUCCESS, amazon } }
    function failure(error)   { return { type: userConstants.GETALLPAYMENTS_FAILURE, error } }
}

function ebayKey(data){
    return dispatch => {
        dispatch(request());

        userService.ebayKey(data)
            .then(
                ebay  => {
                    dispatch(success(ebay))
                    dispatch(alertActions.success(ebay.message));
                    history.push('/profile')
                },
                error => {
                    dispatch(failure, (error));
                    dispatch(alertActions.error(error));
                }
        );
};

    function request()      { return { type: userConstants.GETALLPAYMENTS_REQUEST } }
    function success(ebay)  { return { type: userConstants.GETALLPAYMENTS_SUCCESS, ebay } }
    function failure(error) { return { type: userConstants.GETALLPAYMENTS_FAILURE, error } }
}

function deleteAmazonAssociate(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteAmazonAssociate(id)
            .then(
                amazon => {
                    dispatch(success(id));
                    dispatch(alertActions.success(amazon.message));
                    window.location.reload();
                },
                error => {
                    dispatch(failure, (id, error));
                    dispatch(alertActions.error(error));
                }
        );
};

    function request(id)        { return { type: userConstants.CARD_DELETE_REQUEST, id } }
    function success(id)        { return { type: userConstants.CARD_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.CARD_DELETE_FAILURE, id, error } }
}

function deleteEbayAssociate(id) {
    return dispatch => {
        dispatch(request(id));

        userService.deleteEbayAssociate(id)
            .then(
                ebay => {
                    dispatch(success(id));
                    dispatch(alertActions.success(ebay.message));
                    window.location.reload();
                },
                error => {
                    dispatch(failure, (id, error));
                    dispatch(alertActions.error(error));
                }
        );
};

    function request(id)        { return { type: userConstants.CARD_DELETE_REQUEST, id } }
    function success(id)        { return { type: userConstants.CARD_DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.CARD_DELETE_FAILURE, id, error } }
}

function getCountry() {
    return dispatch => {
        dispatch(request());

        userService.getCountry()
            .then(
                country => {
                    dispatch(success(country));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()        { return { type: countryConstants.GET_REQUEST } }
    function success(country) { return { type: countryConstants.GET_SUCCESS, country } }
    function failure(error)   { return { type: countryConstants.GET_FAILURE, error } }
}

function getSearch(data){
    return dispatch => {
        dispatch(request());

        userService.getSearch(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: searchConstants.SEARCH_GET_REQUEST } }
    function success(data)  { return { type: searchConstants.SEARCH_GET_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.SEARCH_GET_FAILURE, error } }
}


function activateAccount(data){
    return dispatch => {
        dispatch(request());

        userService.activateAccount(data)
            .then(
                data => {
                    dispatch(success(data));
                    dispatch(alertActions.success(data.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: searchConstants.SEARCH_GET_REQUEST } }
    function success(data)  { return { type: searchConstants.SEARCH_GET_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.SEARCH_GET_FAILURE, error } }

}

function getProductEbay(data){
    return dispatch => {
        dispatch(request());

        userService.getProductEbay(data)
            .then(
                data => {
                    dispatch(success(data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: searchConstants.EBAY_GET_REQUEST } }
    function success(data)  { return { type: searchConstants.EBAY_GET_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.EBAY_GET_FAILURE, error } }
}

function actionSupport(data){
    return dispatch => {
        dispatch(request());

        userService.actionSupport(data)
            .then(
                data => {
                    dispatch(success(data));
                    history.push('/profile');
                    dispatch(alertActions.success(data.message));

                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: searchConstants.SEARCH_GET_REQUEST } }
    function success(data)  { return { type: searchConstants.SEARCH_GET_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.SEARCH_GET_FAILURE, error } }
}


function lastSearch(){
    return dispatch => {
        dispatch(request());

        userService.lastSearch()
            .then(
                data => {
                    dispatch(success(data));
                    //dispatch(alertActions.success(data.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: userConstants.HOME_GET_REQUEST } }
    function success(data)  { return { type: userConstants.HOME_GET_SUCCESS, data } }
    function failure(error) { return { type: userConstants.HOME_GET_FAILURE, error } }
}


function detailCreditCard(id){
    return dispatch => {
        dispatch(request());

        userService.detailCreditCard(id)
            .then(
                data => {
                    dispatch(success(data));
                    //dispatch(alertActions.success(data.message));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request()      { return { type: userConstants.CARD_GET_REQUEST } }
    function success(data)  { return { type: userConstants.CARD_GET_SUCCESS, data } }
    function failure(error) { return { type: userConstants.CARD_GET_FAILURE, error } }
}