import { alertConstants } from '../_constants';
import { toast } from 'react-toastify';
import { history } from '../_helpers';
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
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
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
            if(typeof value === 'object'){
                if(value.detail){
                    history.push('login');
                }else{
                    console.log(value);
                    if(value.type_plan){
                        var user = JSON.parse(localStorage.getItem('user'))
                        value.Token = user.Token;
                        localStorage.setItem('user', JSON.stringify(value))   
                    }
                    toast.error(value.message, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });  
                }      
            }else{
                value.message.forEach(data => {
                    toast.error(data, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                });
            }            
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
    return { type: alertConstants.CLEAR };
}