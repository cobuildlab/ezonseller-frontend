import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    displayErrorMessage
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    window.location.reload();   
    return { type: alertConstants.CLEAR };
}

function displayErrorMessage(message){
}
