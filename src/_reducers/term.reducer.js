import { termConstants } from '../_constants';

export function term(state = {}, action) {
  switch (action.type) {
    case termConstants.TERM_REQUEST:
      return {
        loading: true
      };
    case termConstants.TERM_SUCCESS:
      return {
        items: action.term
      };
    case termConstants.TERM_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
