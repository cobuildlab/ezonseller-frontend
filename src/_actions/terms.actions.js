import { termConstants } from '../_constants';
import { termsService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const termsActions = {
    getTerms
};


function getTerms() {
    return dispatch => {
        dispatch(request());

        termsService.getTerms()
            .then(
                term  => dispatch(success(term)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: termConstants.TERM_REQUEST } }
    function success(term) { return { type: termConstants.TERM_SUCCESS, term } }
    function failure(error) { return { type: termConstants.TERM_FAILURE, error } }
}
