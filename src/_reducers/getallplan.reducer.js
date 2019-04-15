import { userConstants } from '../_constants';

export function getallplan(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_DETAILS_PLAN_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_DETAILS_PLAN_SUCCESS:
      return {
        items: action.plan
      };
    case userConstants.GET_DETAILS_PLAN_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}
