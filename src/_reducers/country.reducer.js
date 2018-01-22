import { countryConstants } from '../_constants';

export function countrys(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case countryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case countryConstants.GETALL_SUCCESS:
      return {
        items: action.allCountry
      };
    case countryConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}


export function country(state = {}, action) {
  switch (action.type) {
    case countryConstants.GET_REQUEST:
      return {
        loading: true
      };
    case countryConstants.GET_SUCCESS:
      return {
        items: action.country
      };
    case countryConstants.GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}