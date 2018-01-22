import { authHeader } from '../_helpers';
import $ from 'jquery';

export const userService = {
    login,
    logout,
    register,
    recoveryPassword,
    changePassword,
    getAll,
    getById,
    editUserId,
    update,
    changePasswordEdit,
    paymentPlans,
    addCreditCard,
    uploadImage,
    delete: _delete,
    deleteCreditCard,
    acquirePlan,
    cancelSuscription,
    cancelPlan,
    countryList
};

const URL = "https://ezonseller-backend.herokuapp.com/";


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(URL + 'login/', requestOptions)
        .then(response => {
            if (!response.ok) {
              //console.error("ERROR ON FETCH", JSON.stringify(response));
                return Promise.reject(response.json());
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.Token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'accounts/profile/', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'accounts/profile/' + id + '/', requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(URL + 'accounts/register/', requestOptions).then(handleResponse);
}

function recoveryPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
    };
    return fetch(URL + 'accounts/recoverypassword/', requestOptions).then(handleResponse);
}

function changePassword(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(URL + 'accounts/changepassword/', requestOptions).then(handleResponse);
}

function editUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(URL + 'accounts/profile/' + id + '/', requestOptions).then(handleResponse);;
}

function paymentPlans() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(URL + 'payment/plans', requestOptions).then(handleResponse);;
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(URL + 'accounts/profile/' + user.id + '/', requestOptions).then(handleResponse);;
}

function uploadImage(data){
    let user = JSON.parse(localStorage.getItem('user'));
    return $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: URL + "accounts/profile/2/uploadImage/",
            data: data,
            "headers": {
                "authorization": "token " + user.Token,
            },
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
}

function changePasswordEdit(data) {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(URL + 'accounts/profile/' + user.id + '/changePassword/', requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function deleteCreditCard(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(URL + 'payment/card/' + id + '/', requestOptions).then(handleResponse);
}


function addCreditCard(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(URL + 'payment/card/', requestOptions).then(handleResponse);
}

function acquirePlan(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(URL + 'payment/purchase/', requestOptions).then(handleResponse);
}

function cancelSuscription() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'payment/cancel-subscription/', requestOptions).then(handleResponse);;
}


function countryList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'country-list/', requestOptions).then(handleResponse);;
}

function cancelPlan(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(URL + 'payment/cancel-subscription/', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}
