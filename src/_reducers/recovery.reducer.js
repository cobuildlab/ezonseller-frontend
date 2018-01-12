import { userConstants } from '../_constants';

export function recovery(state = {}, action) {
  switch (action.type) {
    case userConstants.RECOVERY_REQUEST:
      return {
        loading: true
      };
    case userConstants.RECOVERY_SUCCESS:
      return {
        items: action.user
      };
    case userConstants.RECOVERY_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
