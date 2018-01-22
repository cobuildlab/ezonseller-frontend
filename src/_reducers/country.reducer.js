import { countryConstants } from '../_constants';

export function country(state = {}, action) {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case countryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case countryConstants.GETALL_SUCCESS:
      return {
        items: action.countryList
      };
    case countryConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}