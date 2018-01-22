import { alertConstants } from '../_constants';
import { toast } from 'react-toastify';
import $ from 'jquery';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    $().ready(function() {
        $(".fakeloader").fadeOut();
    });
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {

    let error = "";

    $().ready(function() {
        $(".fakeloader").fadeOut();
    });

    if(Promise.resolve(message) === message){
        message.then(function(value) {
            error = value.message;
            toast.error(value.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }else{
        error = String(message);
        toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
    return { type: alertConstants.ERROR, error };
}

function clear() {
    $().ready(function() {
        $(".fakeloader").fadeOut();
    });
    return { type: alertConstants.CLEAR };
}