import { authHeader } from '../_helpers';

export const termsService = {
    getTerms
};

const URL = "https://ezonsellerbackend.herokuapp.com/";

function getTerms() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(URL + 'terms', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
