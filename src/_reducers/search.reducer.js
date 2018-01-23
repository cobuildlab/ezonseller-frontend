import { searchConstants } from '../_constants';

export function search(state = {}, action) {
  switch (action.type) {
    case searchConstants.SEARCH_GET_REQUEST:
      return {
        loading: true
      };
    case searchConstants.SEARCH_GET_SUCCESS:
      return {
        items: action.data
      };
    case searchConstants.SEARCH_GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
