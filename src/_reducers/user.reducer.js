import { userConstants } from '../_constants';

export function user(state = {}, action) {
  if(state.items != undefined){
    console.log(state.items.credit_cards);
    state.items.credit_cards.map(user => {
              console.log(user)
        })
  }
       
  switch (action.type) {
    case userConstants.GETBYID_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        items: action.user
      };
    case userConstants.GETBYID_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
      case userConstants.CARD_DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state
      };
    case userConstants.CARD_DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items
      };
    case userConstants.CARD_DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: action.user
      };
    default:
      return state
  }
}



export function editUser(state = {}, action) {
  switch (action.type) {
    case userConstants.EDITBYID_REQUEST:
      return {
        loading: true
      };
    case userConstants.EDITBYID_SUCCESS:
      return {
        items: action.editUser
      };
    case userConstants.EDITBYID_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}


export function paymentsPlans(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALLPAYMENTS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALLPAYMENTS_SUCCESS:
      return {
        items: action.payments
      };
    case userConstants.GETALLPAYMENTS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}


export function cancelPlans(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case userConstants.SUSCRIPTION_GET_REQUEST:
      return {
        loading: true
      };
    case userConstants.SUSCRIPTION_GET_SUCCESS:
      return {
        items: action.suscription
      };
    case userConstants.SUSCRIPTION_GET_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}